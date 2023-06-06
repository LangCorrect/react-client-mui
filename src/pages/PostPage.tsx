import PostList from "../components/posts/PostList.tsx";
import { Button, Stack, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate.tsx";
import useAuth from "../hooks/useAuth.tsx";
import axios from "../api/axios.tsx";
import { IAuthContext } from "../context/AuthProvider.tsx";

export interface PostInterface {
    id: number;
    content: {
        title: string;
        text: string;
        native_text: string;
    };
    language: {
        code: string;
        en_name: string;
    };
    meta: {
        slug: string;
        tags: string[];
        permission: string;
        created: string;
        modified: string;
    };
    gender_of_narration: string;
    prompt: null | string;
    language_level: null | string;
    user: {
        username: string;
        is_premium: boolean;
    };
    total_correctors: number;
    corrected_by: string[];
}

const SECTION_TITLE: { [key: string]: string } = {
    teach: "Journals awaiting your correction",
    learn: "Journals in the languages you’re studying",
    recentlyCorrected: "Recently corrected journals",
};

interface IProps {
    mode: string;
}

const PostPage = ({ mode }: IProps) => {
    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();
    const navigate = useNavigate();

    const { isLoading, isError, data } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    });

    const authContext = useAuth();
    const { accessToken } = authContext as IAuthContext;

    async function fetchPosts() {
        let results = [];

        if (accessToken) {
            try {
                const response = await axiosPrivate.get("/journals");
                results = response.data.results;
            } catch (err) {
                navigate("/login", {
                    state: { from: location },
                    replace: true,
                });
            }
        } else {
            const response = await axios.get("/journals");
            results = response.data.results;
        }
        return results;
    }

    if (isError) return <h1>Problems loading...</h1>;

    return (
        <>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={3}
            >
                <Typography variant="h5">{SECTION_TITLE[mode]}</Typography>

                <Button
                    variant="contained"
                    startIcon={<CreateIcon />}
                    component={Link}
                    to="/create/post"
                >
                    New Post
                </Button>
            </Stack>

            <PostList posts={data} isLoading={isLoading} />
        </>
    );
};

export default PostPage;
