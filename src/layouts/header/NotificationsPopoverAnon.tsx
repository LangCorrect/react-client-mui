import {
    Badge,
    Box,
    IconButton,
    Popover,
    Typography,
    useTheme,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React, { useState } from "react";
import RoundButton from "../common/buttons/RoundButton";

const NotificationsPopoverAnon = () => {
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
                    badgeContent={1}
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
                        width: 320,
                    },
                }}
            >
                <Box display="flex" flexDirection="column" gap={3} p={3}>
                    <NotificationsIcon
                        sx={{ fontSize: 40, alignSelf: "center" }}
                        color="inherit"
                    />
                    <Typography variant="h5" fontWeight={500}>
                        Sign up to see notifications from students and native
                        speakers!
                    </Typography>
                    <Typography variant="subtitle2">
                        Join tens of thousands of learners worldwide like
                        yourself who are enhancing their language skills.
                    </Typography>
                    <RoundButton
                        text="Get started!"
                        size="large"
                        variant="contained"
                    />
                </Box>
            </Popover>
        </>
    );
};

export default NotificationsPopoverAnon;
