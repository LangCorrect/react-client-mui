import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    Box,
    Typography,
    CardContent,
    Stack,
    Tooltip,
    Chip,
} from "@mui/material";
import { Language, Reply } from "@mui/icons-material";
import useAuth from "../../hooks/useAuth.tsx";

export interface Prompt {
    id: number;
    username: string;
    content: string;
    difficulty_level: string;
    language: number;
    created: string;
    updated: string;
    slug: string;
    tags: string[];
    challenge: number | null;
}

interface PromptPreviewProps {
    prompt: Prompt;
}

const PromptPreview = ({ prompt }: PromptPreviewProps) => {
    const authContext = useAuth();
    if (authContext === null) return <p>Loading...</p>;

    const { content } = prompt;

    return (
        <Card sx={{ marginBottom: 3 }}>
            <CardActionArea>
                <CardContent>
                    <Box>
                        <Typography
                            mb={2}
                            style={{
                                display: "inline-block",
                                whiteSpace: "break-spaces",
                            }}
                        >
                            {content}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
            <CardActions
                sx={{ display: "flex", justifyContent: "space-between" }}
            >
                <Stack direction="row" spacing={1}>
                    <Tooltip arrow title={prompt.language}>
                        <Chip
                            icon={<Language />}
                            label={prompt.language}
                            size="small"
                            variant="outlined"
                        />
                    </Tooltip>
                    <Tooltip arrow title="Responses">
                        <Chip
                            size="small"
                            label="x responses"
                            variant="outlined"
                        />
                    </Tooltip>
                </Stack>
                <Button size="small" variant={"outlined"} startIcon={<Reply />}>
                    Respond
                </Button>
            </CardActions>
        </Card>
    );
};

export default PromptPreview;
