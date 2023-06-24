import api from "./api";

export interface IRegisterUser {
    username: string;
    password: string;
    password2: string;
    email: string;
    native_language: string;
    studying_language: string;
    studying_level: string;
    gender: string;
}

const login = async (username: string, password: string) => {
    return await api.post(`/token/`, { username, password });
};

const register = async (data: IRegisterUser) => {
    return await api.post(`users/~create`, data);
};

const AuthService = {
    login,
    register,
};

export default AuthService;
