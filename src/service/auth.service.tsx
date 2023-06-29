import api from "./api";
import { UserRegisterFormValues } from "../types";


const login = async (username: string, password: string) => {
    return await api.post(`/token/`, { username, password });
};

const register = async (data: UserRegisterFormValues) => {
    return await api.post(`users/~create`, data);
};

const AuthService = {
    login,
    register,
};

export default AuthService;
