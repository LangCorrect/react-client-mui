import { useNavigate, useParams } from "react-router-dom";
import LayersIcon from "@mui/icons-material/Layers";
import PersonIcon from "@mui/icons-material/Person";
import Post from "../components/posts/Post";
import {
    Button,
    ButtonGroup,
    Card,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import UserCorrections, {
    IUserCorrections,
} from "../components/corrections/UserCorrections";
import { useQueries } from "@tanstack/react-query";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import PostPreviewSkeleton from "../components/posts/PostPreviewSkeleton";
import UserCorrectionSkeleton from "../components/corrections/UserCorrectionSkeleton";
import PostService from "../service/post.service";
import CorrectionService from "../service/correction.service";

const PostDetailPage = () => {
    const params = useParams();
    const slug = params.slug || "";

    const navigate = useNavigate();

    const [postQuery, correctionsQuery] = useQueries({
        queries: [
            {
                queryKey: ["posts", slug],
                queryFn: () => PostService.getPost(slug),
            },
            {
                queryKey: ["corrections", slug],
                queryFn: () => CorrectionService.getCorrectionsForPost(slug),
            },
        ],
    });

    const renderPost = postQuery.isLoading ? (
        <PostPreviewSkeleton />
    ) : (
        <Post post={postQuery.data} />
    );

    const isCorrected = correctionsQuery.data?.length;

    const renderCorrections = correctionsQuery.isLoading ? (
        <UserCorrectionSkeleton />
    ) : isCorrected ? (
        <>
            <Stack
                direction="row"
                justifyContent="end"
                alignItems="center"
                gap={1}
                my={3}
            >
                <Typography>Corrections</Typography>
                <ButtonGroup variant="outlined">
                    <Tooltip title="Display corrections grouped by user">
                        <Button>
                            <PersonIcon />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Display corrections grouped by sentence">
                        <Button>
                            <LayersIcon />
                        </Button>
                    </Tooltip>
                </ButtonGroup>
            </Stack>

            <Stack gap={5}>
                {correctionsQuery.data?.map((correction: IUserCorrections) => (
                    <UserCorrections
                        key={correction.username}
                        username={correction.username}
                        corrections={correction.corrections}
                        comments={correction.comments}
                        overall_feedback={correction?.overall_feedback}
                    />
                ))}
            </Stack>
        </>
    ) : (
        <Card sx={{ mt: 5, p: 2 }}>
            <Typography>This post has not been corrected yet.</Typography>
        </Card>
    );

    return (
        <>
            <Button
                onClick={() => navigate(-1)}
                startIcon={<KeyboardBackspaceIcon />}
                sx={{ mb: 2 }}
            >
                Go back
            </Button>

            {renderPost}
            {renderCorrections}
        </>
    );
};

export default PostDetailPage;
