import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

interface Props {
    message: string;
    severity?: "error" | "success";
}

const SnackBar = ({ message, severity }: Props) => {
    const [open, setOpen] = useState(true);

    const handleClose = (
        _event: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={severity}
                sx={{ width: "100%" }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SnackBar;
