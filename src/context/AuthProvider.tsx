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

interface ILanguage {
    code: string;
    en_name: string;
}

export interface ICurrentUser {
    id: number;
    username: string;
    nick_name: string;
    bio: string;
    gender: string;
    is_premium: boolean;
    user_role: string;
    date_joined: string;
    get_studying_languages: ILanguage[];
    get_native_languages: ILanguage[];
}

export interface IAuthContext {
    currentUser: ICurrentUser | null;
    refreshToken: string | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    userInfoLoaded: boolean;
    logout: () => void;
    setCurrentUser: (user: ICurrentUser | null) => void;
    setRefreshToken: (token: string) => void;
    setAccessToken: (token: string) => void;
}

interface IDecodeToken {
    token_type: string;
    exp: number;
    iat: number;
    jti: string;
    user_id: number;
    username: string;
}

const AuthContext = createContext<IAuthContext | null>(null);

/**
 * DEV NOTE:
 * - As the React client is not being served by the server directly, it caused some problems in
 *  passing user information form the server to the client.
 * - In order to ensure that the layouts and views are rendered correctly, it's crucial to have
 *  the user information fully loaded.
 * - To address this, I have introduced a state variable called `userInfoLoaded` to track the
 *  complete loading of user information.
 * - Additionally, I have implemented some specific logic in the routes that executes only when
 *  `userInfoLoaded` evaluates to true.
 * - This solution feels a bit janky....
 */

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [accessToken, setAccessToken] = useLocalStorage(
        ACCESS_TOKEN_STORAGE_ID,
    );
    const [refreshToken, setRefreshToken] = useLocalStorage(
        REFRESH_TOKEN_STORAGE_ID,
    );
    const [currentUser, setCurrentUser] = useState<ICurrentUser | null>(null);

    const [userInfoLoaded, setUserInfoLoaded] = useState(false);

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
                const decodedToken = jwtDecode<IDecodeToken>(accessToken);
                const { username } = decodedToken;
                const user = await UserService.getUser(username);
                setCurrentUser(user);
                setUserInfoLoaded(true);
            } else {
                setCurrentUser(null);
                setUserInfoLoaded(true);
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
                userInfoLoaded,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
