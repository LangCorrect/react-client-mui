import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CommentList from "../comments/CommentList";
import { Typography } from "@mui/material";
import { Comment } from "../../types";

interface Props {
    comments: Comment[];
}

const CorrectionComments = ({ comments }: Props) => {
    return (
        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography fontWeight={700}>
                    Comments ({comments.length})
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <CommentList comments={comments} />
            </AccordionDetails>
        </Accordion>
    );
};

export default CorrectionComments;
