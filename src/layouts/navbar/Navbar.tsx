import { useState } from "react";
import ArticleIcon from "@mui/icons-material/Article";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

export interface NavbarProps {
    isNavOpen: boolean;
    onNavClose: () => void;
}

const NAV_WIDTH = 250;

/**
 * Renders the navbar component
 *
 * Props:
 * - isNavOpen
 * - onNavClose
 *
 * {SimpleLayout} -> Navbar
 */

const Navbar = ({ isNavOpen, onNavClose }: NavbarProps) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Drawer anchor="left" open={isNavOpen} onClose={onNavClose}>
            <Box sx={{ width: NAV_WIDTH }} role="presentation">
                <List>
                    <ListItemButton
                        component={Link}
                        to="/"
                        onClick={onNavClose}
                    >
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <ArticleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Posts" />
                        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto">
                        <List component="div">
                            <ListItemButton
                                sx={{ pl: 4 }}
                                component={Link}
                                to="/teach"
                                onClick={onNavClose}
                            >
                                <ListItemText primary="Teach" />
                            </ListItemButton>
                            <ListItemButton
                                sx={{ pl: 4 }}
                                component={Link}
                                to="/learn"
                                onClick={onNavClose}
                            >
                                <ListItemText primary="Learn" />
                            </ListItemButton>
                            <ListItemButton
                                sx={{ pl: 4 }}
                                component={Link}
                                to="/feed/following"
                                onClick={onNavClose}
                            >
                                <ListItemText primary="Following" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                    <ListItemButton
                        component={Link}
                        to="/rankings"
                        onClick={onNavClose}
                    >
                        <ListItemIcon>
                            <EmojiEventsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Rankings" />
                    </ListItemButton>
                </List>
            </Box>
        </Drawer>
    );
};

export default Navbar;
