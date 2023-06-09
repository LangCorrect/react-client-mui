import React from "react";

import {
    Avatar,
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
import FlagIcon from "@mui/icons-material/Flag";
import LanguageIcon from "@mui/icons-material/Language";
import { Link } from "react-router-dom";
import Article from "./Article.tsx";
import useAuth from "../../hooks/useAuth.tsx";
import { Post } from "../../types.ts";
import CorrectButton from "../../layouts/common/buttons/CorrectButton.tsx";

interface Props {
    post: Post;
}

const PostPreview = ({ post }: Props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const { currentUser } = useAuth();

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
                    <Link to={`/users/${user.username}`}>
                        <Avatar aria-label={user.username}>
                            {user.username.slice(0, 1)}
                        </Avatar>
                    </Link>
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
                title={
                    <Link
                        to={`/users/${user.username}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        {user.username}
                    </Link>
                }
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

                <CorrectButton
                    slug={meta.slug}
                    isCorrectedByUser={isCorrectedByUser}
                    isDisabled={user.username === currentUser?.username}
                />
            </CardActions>
        </Card>
    );
};

export default PostPreview;
