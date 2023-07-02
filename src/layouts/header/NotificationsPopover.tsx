import {
    Avatar,
    Badge,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Popover,
    Stack,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreateIcon from "@mui/icons-material/Create";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import NotificationService from "../../service/notification.service";
import TruncateText from "../../components/TruncateText";
import { useNavigate } from "react-router-dom";
import { Notification as INotification } from "../../types";

const NotificationsPopover = () => {
    const theme = useTheme();
    const isLightMode = theme.palette.mode === "light";
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["notifications"],
        queryFn: NotificationService.getNotifications,
    });

    const markReadNotificationMutation = useMutation({
        mutationFn: async (notification: INotification) => {
            const notificationSlug = notification.slug;
            const postSlug = notification.obj_slug.replace(
                "journal",
                "journals",
            );
            await NotificationService.markNotificationRead(notificationSlug);
            navigate(postSlug);
        },
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ["notifications"],
            }),
        onError: () => console.log("Error marking notification as read"),
    });

    const clearAllNotificationsMutation = useMutation({
        mutationFn: NotificationService.clearAllNotifications,
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ["notifications"],
            }),
        onError: () => console.log("Error clearing all notifications"),
    });

    const handleOpen = (evt: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(true);
        setAnchorEl(evt.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error...</p>;

    return (
        <>
            <IconButton onClick={handleOpen} color="inherit">
                <Badge
                    badgeContent={data?.unread_count}
                    color={isLightMode ? "secondary" : "primary"}
                >
                    <NotificationsIcon color="inherit" />
                </Badge>
            </IconButton>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                PaperProps={{
                    sx: {
                        mt: 1.4,
                        width: 360,
                        height: 360,
                    },
                }}
            >
                <Stack
                    display="flex"
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    margin={1}
                >
                    <Typography sx={{ padding: 1, fontWeight: 700 }}>
                        Notifications
                    </Typography>
                    <IconButton
                        sx={{ padding: 1 }}
                        onClick={() => clearAllNotificationsMutation.mutate()}
                        disabled={data?.unread_count === 0 ? true : false}
                    >
                        <Tooltip title="Clear all notifications" arrow>
                            <DeleteOutlineIcon />
                        </Tooltip>
                    </IconButton>
                </Stack>
                <List
                    sx={{
                        width: "100%",
                        maxWidth: 360,
                        maxHeight: 300,
                        bgcolor: "background.paper",
                        overflow: "auto",
                    }}
                    disablePadding
                >
                    <Divider />

                    {data?.unread_list?.map((notification: INotification) => (
                        <ListItemButton
                            alignItems="flex-start"
                            key={notification.id}
                            onClick={() =>
                                markReadNotificationMutation.mutate(
                                    notification,
                                )
                            }
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <CreateIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${notification.actor}${notification.verb}`}
                                secondary={
                                    <TruncateText
                                        text={notification.action_object}
                                    />
                                }
                            />
                        </ListItemButton>
                    ))}
                    {data?.unread_count === 0 && (
                        <ListItem>
                            <ListItemText>
                                You have no notifications.
                            </ListItemText>
                        </ListItem>
                    )}
                </List>
            </Popover>
        </>
    );
};

export default NotificationsPopover;
