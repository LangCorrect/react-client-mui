import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import RoundButton from "../common/buttons/RoundButton";
import { Link } from "react-router-dom";

const FeedMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <RoundButton
                text="My Feed"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
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
                <MenuItem
                    component={Link}
                    onClick={handleClose}
                    to="/teach"
                >
                    Teach
                </MenuItem>
                <MenuItem
                    component={Link}
                    onClick={handleClose}
                    to="/learn"
                >
                    Learn
                </MenuItem>
                <MenuItem
                    component={Link}
                    onClick={handleClose}
                    to="/feed/following"
                >
                    Following
                </MenuItem>
            </Menu>
        </>
    );
};

export default FeedMenu;
