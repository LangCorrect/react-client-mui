import React from "react";

import { PostInterface } from "../../pages/PostPage.tsx";
import {
    Avatar,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardHeader,
    Chip,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Stack,
    Tooltip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FlagIcon from "@mui/icons-material/Flag";
import LanguageIcon from "@mui/icons-material/Language";
import { Link } from "react-router-dom";
import Article from "./Article.tsx";
import useAuth from "../../hooks/useAuth.tsx";

interface PostPreviewInterface {
    post: PostInterface;
}

const PostPreview = ({ post }: PostPreviewInterface) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const authContext = useAuth();
    if (authContext === null) return <p>Loading...</p>;

    const { currentUser } = authContext;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { user, meta, content, total_correctors, corrected_by } = post;

    const isCorrectedByUser = currentUser
        ? corrected_by?.includes(currentUser?.username)
        : false;

    return (
        <Card sx={{ marginBottom: 3 }}>
            <CardHeader
                avatar={
                    <Avatar aria-label={user.username}>
                        {user.username.slice(0, 1)}
                    </Avatar>
                }
                action={
                    <IconButton
                        aria-controls={open ? "menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        aria-label="settings"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                }
                title={user.username}
                subheader={meta.created}
            />
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
                        <BookmarkBorderIcon />
                    </ListItemIcon>
                    <ListItemText>Save</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <PermIdentityIcon />
                    </ListItemIcon>
                    <ListItemText>View profile</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <FlagIcon />
                    </ListItemIcon>
                    <ListItemText>Report post</ListItemText>
                </MenuItem>
            </Menu>
            <CardActionArea component={Link} to={`/journals/${meta.slug}`}>
                <Article title={content.title} text={content.text} />
            </CardActionArea>
            <CardActions
                sx={{ display: "flex", justifyContent: "space-between" }}
            >
                <Stack direction="row" spacing={1}>
                    <Tooltip arrow title={post.language.en_name}>
                        <Chip
                            icon={<LanguageIcon />}
                            label={post.language.code}
                            size="small"
                            variant="outlined"
                        />
                    </Tooltip>
                    <Tooltip arrow title="Corrections">
                        <Chip
                            icon={<CheckCircleOutlineIcon />}
                            size="small"
                            label={total_correctors}
                            variant="outlined"
                        />
                    </Tooltip>
                </Stack>
                <Button
                    size="small"
                    variant={isCorrectedByUser ? "contained" : "outlined"}
                    startIcon={<CheckCircleOutlineIcon />}
                    component={Link}
                    to={`/journals/${meta.slug}/make-corrections`}
                >
                    {isCorrectedByUser ? "Already corrected" : "Correct"}
                </Button>
            </CardActions>
        </Card>
    );
};

export default PostPreview;
