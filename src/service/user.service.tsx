import api from "./api";

const getUser = async (username: string) => {
    const resp = await api.get(`/users/${username}`);
    return resp?.data;
};

const getUserPrompts = async (username: string) => {
    const resp = await api.get(`/users/${username}/prompts`);
    return resp?.data?.results;
};

const getUserFollowers = async (username: string) => {
    const resp = await api.get(`/users/${username}/followers`);
    return resp?.data;
};

const getUserFollowings = async (username: string) => {
    const resp = await api.get(`/users/${username}/following`);
    return resp?.data;
};

const UserService = {
    getUser,
    getUserPrompts,
    getUserFollowers,
    getUserFollowings,
};

export default UserService;
