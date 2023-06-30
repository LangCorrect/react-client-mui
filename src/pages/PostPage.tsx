import PostList from "../components/posts/PostList.tsx";
import { Button, Stack, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import PostService from "../service/post.service.tsx";

interface Props {
    mode: "teach" | "learn" | "following";
    title: string;
}

const PostPage = ({ mode, title }: Props) => {
    const { isLoading, isError, data } = useQuery({
        queryKey: ["posts", mode],
        queryFn: () => PostService.getPostList(mode),
    });

    if (isError) return <h1>Problems loading...</h1>;

    return (
        <>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={3}
            >
                <Typography variant="h5">{title}</Typography>

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
