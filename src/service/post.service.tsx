import api from "./api";
import { PostFormValues } from "../components/posts/PostForm";

const getPostList = async (mode = "teach") => {
    const params = { mode: mode };
    const resp = await api.get(`/journals`, { params });
    return resp?.data?.results;
};

const getPost = async (slug: string) => {
    const resp = await api.get(`/journals/${slug}`);
    return resp?.data;
};

const editPost = async (slug: string, data: PostFormValues) => {
    const resp = await api.patch(`/journals/${slug}`, data);
    return resp;
};

const deletePost = async (slug: string) => {
    const resp = await api.delete(`/journals/${slug}`);
    return resp;
};

const createPost = async (data: PostFormValues) => {
    const resp = await api.post(`/journals/`, data);
    return resp;
};

const PostService = {
    getPostList,
    getPost,
    editPost,
    deletePost,
    createPost,
};

export default PostService;
