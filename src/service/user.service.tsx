import api from "./api";

const getUser = async (username: string) => {
    const resp = await api.get(`/users/${username}`);
    return resp?.data;
};

const UserService = {
    getUser,
};

export default UserService;
