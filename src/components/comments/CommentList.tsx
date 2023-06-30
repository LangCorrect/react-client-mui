import { List } from "@mui/material";
import Comment from "./Comment";
import { Comment as IComment } from "../../types";

interface Props {
    comments: IComment[];
}

const CommentList = ({ comments }: Props) => {
    return (
        <List disablePadding>
            {comments.map((comment) => (
                <Comment
                    key={comment.id}
                    id={comment.id}
                    username={comment.username}
                    text={comment.text}
                />
            ))}
        </List>
    );
};

export default CommentList;
