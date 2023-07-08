import {
    IconButton,
    Popover,
    Box,
    FormControlLabel,
    FormGroup,
    Switch,
    useTheme,
} from "@mui/material";
import React, { useState, MouseEvent, useContext } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { RTLContext } from "../../context/RTLProvider";
import { ColorModeContext } from "../../theme";

interface Props {
    children: React.ReactNode;
}

const BasicPopover = ({ children }: Props) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <div>
            <IconButton color="inherit" onClick={handleClick}>
                <SettingsIcon />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <Box
                    sx={{
                        padding: "1rem",
                    }}
                >
                    {children}
                </Box>
            </Popover>
        </div>
    );
};

const SettingsPopover = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const RtlMode = useContext(RTLContext);

    return (
        <BasicPopover>
            <Box p={0.5}>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                size="medium"
                                onClick={RtlMode.toggleRTL}
                                checked={
                                    theme.direction === "rtl" ? true : false
                                }
                            />
                        }
                        label="RTL"
                        labelPlacement="start"
                        sx={{
                            justifyContent: "space-between",
                            margin: "0px",
                        }}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                size="medium"
                                onClick={colorMode.toggleColorMode}
                                checked={
                                    theme.palette.mode === "dark" ? true : false
                                }
                            />
                        }
                        label="Dark Mode"
                        labelPlacement="start"
                        sx={{
                            justifyContent: "space-between",
                            margin: "0px",
                        }}
                    />
                </FormGroup>
            </Box>
        </BasicPopover>
    );
};

export default SettingsPopover;
