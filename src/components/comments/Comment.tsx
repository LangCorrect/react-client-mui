import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

interface Props {
    id: string;
    username: string;
    text: string;
}

const Comment = ({ username, text }: Props) => {
    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt={username} src="/" />
            </ListItemAvatar>
            <ListItemText primary={username} secondary={text} />
        </ListItem>
    );
};

export default Comment;
