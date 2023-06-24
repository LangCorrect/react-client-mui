import { Box, ListItemText } from "@mui/material";
import sanitizeHtml from "sanitize-html";
import ClearIcon from "@mui/icons-material/Clear";

interface SanitizeProps {
    html: string;
    options?: sanitizeHtml.IOptions;
}

const defaultOptions: sanitizeHtml.IOptions = {
    allowedTags: ["span", "del", "ins"],
};

const sanitize = ({ html, options }: SanitizeProps) => ({
    __html: sanitizeHtml(html, { ...defaultOptions, ...options }),
});

const SanitizeHTML = ({ html, options }: SanitizeProps) => (
    <div dangerouslySetInnerHTML={sanitize({ html, options })} />
);

interface IProps {
    sentence: string;
    note: string;
}

const CorrectedSentence = ({ sentence, note }: IProps) => {
    return (
        <ListItemText
            primary={
                <Box
                    component="span"
                    display="flex"
                    alignItems="center"
                    gap={1}
                >
                    <ClearIcon sx={{ color: "error.main" }} />
                    <SanitizeHTML html={sentence} />
                </Box>
            }
            secondary={note}
        />
    );
};

export default CorrectedSentence;

CorrectedSentence.defaultProps = {
    sentence: "",
    note: "",
};
