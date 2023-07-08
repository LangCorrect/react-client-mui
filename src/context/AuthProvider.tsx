import { ReactNode, createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import jwtDecode from "jwt-decode";
import {
    ACCESS_TOKEN_STORAGE_ID,
    REFRESH_TOKEN_STORAGE_ID,
} from "../constants";

import api from "../service/api";
import TokenService from "../service/token.service";
import UserService from "../service/user.service";
import { User } from "../types";

export interface IAuthContext {
    currentUser: User | null;
    refreshToken: string | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isUserInfoLoaded: boolean;
    logout: () => void;
    setCurrentUser: (user: User | null) => void;
    setRefreshToken: (token: string) => void;
    setAccessToken: (token: string) => void;
}

const authContextDefaults: IAuthContext = {
    currentUser: null,
    refreshToken: null,
    accessToken: null,
    isAuthenticated: false,
    isUserInfoLoaded: false,
    logout: () => null,
    setCurrentUser: () => null,
    setRefreshToken: () => null,
    setAccessToken: () => null
};

interface DecodeToken {
    token_type: string;
    exp: number;
    iat: number;
    jti: string;
    user_id: number;
    username: string;
}

const AuthContext = createContext<IAuthContext>(authContextDefaults);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [accessToken, setAccessToken] = useLocalStorage(
        ACCESS_TOKEN_STORAGE_ID,
    );
    const [refreshToken, setRefreshToken] = useLocalStorage(
        REFRESH_TOKEN_STORAGE_ID,
    );
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const [isUserInfoLoaded, setIsUserInfoLoaded] = useState(false);

    const isAuthenticated = currentUser
        ? Object.keys(currentUser).length > 0
        : false;

    const logout = () => {
        setCurrentUser(null);
        setAccessToken(null);
        setRefreshToken(null);
    };

    useEffect(() => {
        async function fetchUser() {
            if (accessToken) {
                const decodedToken = jwtDecode<DecodeToken>(accessToken);
                const { username } = decodedToken;
                const user = await UserService.getUser(username);
                setCurrentUser(user);
                setIsUserInfoLoaded(true);
            } else {
                setCurrentUser(null);
                setIsUserInfoLoaded(true);
            }
        }

        const interceptor = api.interceptors.response.use(
            (res) => {
                return res;
            },
            async (err) => {
                const originalConfig = err.config;

                if (
                    err?.response?.data?.code === "token_not_valid" &&
                    err?.response
                ) {
                    // access token is expired
                    if (err.response.status === 403 && !originalConfig._retry) {
                        originalConfig._retry = true;

                        try {
                            const resp = await api.post("/token/refresh/", {
                                refresh: TokenService.getLocalRefreshToken(),
                            });
                            const { access } = resp.data;
                            TokenService.updateLocalAccessToken(access);
                            return api(originalConfig);
                        } catch (_error) {
                            return Promise.reject(_error);
                        }
                    }

                    // refresh token is expired
                    if (err.response.status === 401 && !originalConfig._retry) {
                        TokenService.removeLocalTokens();
                        setCurrentUser(null);
                    }
                }
                return Promise.reject(err);
            },
        );

        fetchUser();
        return () => api.interceptors.response.eject(interceptor);
    }, [accessToken]);

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                setAccessToken,
                refreshToken,
                setRefreshToken,
                currentUser,
                setCurrentUser,
                isAuthenticated,
                isUserInfoLoaded,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
