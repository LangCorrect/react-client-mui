import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface Props {
    slug: string;
    isCorrectedByUser?: boolean;
    isDisabled?: boolean;
}

const CorrectButton = ({ isCorrectedByUser, isDisabled, slug }: Props) => {
    return (
        <Button
            size="small"
            variant={isCorrectedByUser ? "contained" : "outlined"}
            startIcon={<CheckCircleOutlineIcon />}
            component={Link}
            to={`/journals/${slug}/make-corrections`}
            disabled={isDisabled}
        >
            {isCorrectedByUser ? "Already corrected" : "Correct"}
        </Button>
    );
};

export default CorrectButton;

CorrectButton.defaultProps = {
    isCorrectedByUser: false,
    isDisabled: false,
};
