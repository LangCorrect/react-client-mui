import React from "react";
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Divider,
    IconButton,
    List,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Stack,
    Typography,
} from "@mui/material";
import Correction, { ICorrection } from "./Correction";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CorrectionComments from "./CorrectionComments";
import { CommentInterface } from "../comments/Comment";

interface IOverallFeedback {
    id?: string;
    comment?: string;
    username?: string;
}

export interface IUserCorrections {
    username: string;
    corrections: ICorrection[];
    comments: CommentInterface[];
    overall_feedback: IOverallFeedback[];
}

const UserCorrections = ({
    username,
    corrections,
    comments,
    overall_feedback,
}: IUserCorrections) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const hasFeedback =
        overall_feedback?.length > 0 && overall_feedback[0]?.comment !== "";

    return (
        <>
            <Card>
                <CardHeader
                    avatar={<Avatar>{username.slice(0, 1)}</Avatar>}
                    title={username}
                />
                <Divider />
                <List disablePadding>
                    {corrections.map((correction) => (
                        <Correction key={correction.id} data={correction} />
                    ))}
                </List>
                <CardContent>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography fontWeight={700}>Feedback</Typography>
                        <IconButton
                            edge="end"
                            aria-label="options"
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <EditIcon />
                                </ListItemIcon>
                                <ListItemText>Edit</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <DeleteIcon />
                                </ListItemIcon>
                                <ListItemText>Delete</ListItemText>
                            </MenuItem>
                        </Menu>
                    </Stack>
                    {hasFeedback ? (
                        overall_feedback?.map((fnote) => (
                            <Typography key={fnote.id}>
                                {fnote.comment}
                            </Typography>
                        ))
                    ) : (
                        <Typography>No feedback has been provided.</Typography>
                    )}
                </CardContent>
                <CorrectionComments comments={comments} />
            </Card>
        </>
    );
};

export default UserCorrections;
