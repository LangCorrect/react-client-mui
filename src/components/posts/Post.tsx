import React, { useState } from "react";

import { PostInterface } from "../../pages/PostPage.tsx";
import {
    Alert,
    Avatar,
    Button,
    Card,
    CardActions,
    CardHeader,
    Chip,
    Divider,
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditableArticle from "./EditableArticle.tsx";
import useAuth from "../../hooks/useAuth.tsx";
import { PostFormValues } from "./PostForm.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError, isAxiosError } from "axios";
import PostService from "../../service/post.service.tsx";

interface PostPreviewInterface {
    post: PostInterface;
}

export interface ISimplePost {
    title: string;
    text: string;
    native_text: string;
    language: string;
    gender_of_narration: string;
    permission: string;
}

const Post = ({ post }: PostPreviewInterface) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [errMsg, setErrMsg] = useState<string | null>(null);
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: (postData: PostFormValues) =>
            PostService.editPost(post.meta.slug, postData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["posts", post.meta.slug],
            });
        },
    });

    const authContext = useAuth();
    if (!authContext) {
        throw new Error("AuthContext must be passed");
    }

    const { currentUser } = authContext;

    const isPostOwner = currentUser
        ? currentUser.username === post.user.username
        : false;

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        setIsEditing(true);
        handleClose();
    };

    const handleSubmit = async (data: PostFormValues) => {
        setIsEditing(false);
        handleClose();
        mutation.mutate(data);
    };

    const handleDelete = async () => {
        try {
            await PostService.deletePost(post.meta.slug);
            navigate("/");
        } catch (err) {
            const error = err as Error | AxiosError;

            if (!isAxiosError(error)) {
                setErrMsg("An error has occured.");
            } else {
                if (!error?.response) {
                    setErrMsg("No server response");
                } else if (error.response?.status === 403) {
                    setErrMsg(error.response?.data?.detail);
                } else {
                    setErrMsg("Action failed. Try again.");
                }
            }
            handleDialogClose();
        }
    };

    const handleDiscard = () => {
        setIsEditing(false);
    };

    const handleDialogOpen = () => {
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const {
        user,
        meta,
        content,
        language,
        total_correctors,
        gender_of_narration,
        corrected_by,
    } = post;

    const serializedPost = {
        title: content.title,
        text: content.text,
        native_text: content?.native_text,
        language: language.code,
        gender_of_narration,
        permission: meta.permission,
    };

    const isCorrectedByUser = currentUser
        ? corrected_by?.includes(currentUser?.username)
        : false;

    return (
        <>
            {errMsg && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {errMsg}
                </Alert>
            )}

            <Card>
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
                <Divider />
                <Menu
                    id="post-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "post-menu-button",
                    }}
                >
                    {isPostOwner
                        ? [
                              <MenuItem
                                  key="edit"
                                  onClick={handleEdit}
                                  disabled={isEditing}
                              >
                                  <ListItemIcon>
                                      <EditIcon />
                                  </ListItemIcon>
                                  <ListItemText>Edit</ListItemText>
                              </MenuItem>,
                              <MenuItem
                                  key="delete"
                                  onClick={handleDialogOpen}
                                  disabled={isEditing}
                              >
                                  <ListItemIcon>
                                      <DeleteIcon />
                                  </ListItemIcon>
                                  <ListItemText>Delete</ListItemText>
                              </MenuItem>,
                          ]
                        : [
                              <MenuItem key="save" onClick={handleClose}>
                                  <ListItemIcon>
                                      <BookmarkBorderIcon />
                                  </ListItemIcon>
                                  <ListItemText>Save</ListItemText>
                              </MenuItem>,
                              <MenuItem key="report" onClick={handleClose}>
                                  <ListItemIcon>
                                      <FlagIcon />
                                  </ListItemIcon>
                                  <ListItemText>Report</ListItemText>
                              </MenuItem>,
                          ]}
                </Menu>
                <EditableArticle
                    post={serializedPost}
                    isEditing={isEditing}
                    onSubmit={handleSubmit}
                    onDiscard={handleDiscard}
                />

                {!isEditing && (
                    <CardActions
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
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
                            variant={
                                isCorrectedByUser ? "contained" : "outlined"
                            }
                            startIcon={<CheckCircleOutlineIcon />}
                            component={Link}
                            to={`/journals/${post.meta.slug}/make-corrections`}
                        >
                            {isCorrectedByUser
                                ? "Already corrected"
                                : "Correct"}
                        </Button>
                    </CardActions>
                )}
            </Card>
            <Dialog
                open={isDialogOpen}
                onClose={handleClose}
                aria-labelledby="modal"
            >
                <DialogTitle id="modal">
                    Are you sure you would like to delete this?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This action is permanent and you will not be able to
                        recover it.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleDialogClose}>
                        Cancel
                    </Button>
                    <Button color="error" onClick={handleDelete} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Post;
