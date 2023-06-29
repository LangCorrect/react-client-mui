import {
    Avatar,
    Badge,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Popover,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreateIcon from "@mui/icons-material/Create";


const NotificationsPopover = () => {
    const theme = useTheme();
    const isLightMode = theme.palette.mode === "light";
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleOpen = (evt: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(true);
        setAnchorEl(evt.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    return (
        <>
            <IconButton onClick={handleOpen} color="inherit">
                <Badge
                    badgeContent={99}
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
                    <IconButton sx={{ padding: 1 }}>
                        <DeleteOutlineIcon />
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
                >
                    {...Array.from({
                        length: 25,
                    }).map((_, idx) => (
                        <>
                            <ListItem alignItems="flex-start" key={idx}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <CreateIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Title"
                                    secondary="Lorem Ipsum asd asdas asdas asd asdas asdasd asd asdasdasd asdasd asda sasdasd asd asd asd"
                                />
                            </ListItem>
                        </>
                    ))}
                </List>
            </Popover>
        </>
    );
};

export default NotificationsPopover;
