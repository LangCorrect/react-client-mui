import { Box, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface Props {
    sentence: string;
}

const PerfectSentence = ({ sentence }: Props) => {
    return (
        <Typography color="success.main">
            <Box component="span" display="flex" alignItems="center" gap={1}>
                <CheckIcon />
                {sentence}
            </Box>
        </Typography>
    );
};

export default PerfectSentence;

PerfectSentence.defaultProps = {
    sentence: "",
};
