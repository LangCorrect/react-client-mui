import { Box, CardContent, Typography } from "@mui/material";
import { PostContent } from "../../types";

const Article = ({ title, text, nativeText }: PostContent) => {
    return (
        <CardContent>
            <Typography mb={2} variant="h5" component="div">
                {title}
            </Typography>
            <Box>
                <Typography
                    mb={2}
                    style={{
                        display: "inline-block",
                        whiteSpace: "break-spaces",
                    }}
                >
                    {text}
                </Typography>
            </Box>
            <Box>
                <Typography
                    color="secondary"
                    style={{
                        display: "inline-block",
                        whiteSpace: "break-spaces",
                    }}
                >
                    {nativeText}
                </Typography>
            </Box>
        </CardContent>
    );
};

export default Article;
