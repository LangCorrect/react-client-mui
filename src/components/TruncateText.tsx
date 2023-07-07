import { Typography } from "@mui/material";

interface Props {
    text: string;
}

const styles = {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
};

const TruncateText = ({ text }: Props) => {
    return (
        <Typography component="span" sx={styles}>
            {text}
        </Typography>
    );
};

export default TruncateText;
