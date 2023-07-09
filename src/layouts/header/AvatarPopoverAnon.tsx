import React, { useState } from "react";
import { Avatar, Box, IconButton, Popover, Typography } from "@mui/material";
import RoundButton from "../common/buttons/RoundButton";

const AvatarPopoverAnon = () => {
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
            <IconButton
                color={open ? "primary" : "default"}
                onClick={handleOpen}
            >
                <Avatar sx={{ width: 36, height: 36 }} />
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
                        mt: 0.8,
                        width: 320,
                    },
                }}
            >
                <Box display="flex" flexDirection="column" gap={2} p={3}>
                    <Avatar
                        sx={{ width: 48, height: 48, alignSelf: "center" }}
                    />

                    <Typography variant="h5" fontWeight={500}>
                        Embark on Your Language Journey
                    </Typography>
                    <Typography>
                        Sign up or log in to LangCorrect to write, receive
                        native feedback and connect globally.
                    </Typography>

                    <Box display="flex" flexDirection="column" gap={1}>
                        <RoundButton
                            text="Sign up"
                            size="large"
                            variant="contained"
                        />
                        <RoundButton
                            text="Login"
                            size="large"
                            variant="outlined"
                        />
                    </Box>
                </Box>
            </Popover>
        </>
    );
};

export default AvatarPopoverAnon;
