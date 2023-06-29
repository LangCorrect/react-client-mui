import api from "./api";

const getUser = async (username: string) => {
    const resp = await api.get(`/users/${username}`);
    return resp?.data;
};

const getUserPrompts = async (username: string) => {
    const resp = await api.get(`/users/${username}/prompts`);
    return resp?.data?.results;
};

const UserService = {
    getUser,
    getUserPrompts,
};

export default UserService;
