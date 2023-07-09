import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import NotificationsPopover from "./NotificationsPopover.js";
import AvatarPopover from "./AvatarPopover.js";
import LogoMarkWhite from "../../assets/logos/logo-mark-white.svg";
import HorizontalLogo from "../../assets/logos/navbar-full-logo.png";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import RoundButton from "../common/buttons/RoundButton.js";
import FeedMenu from "./FeedMenu.js";
import SettingsPopover from "./SettingsPopover.js";
import CreateIcon from "@mui/icons-material/Create";
import NotificationsPopoverAnon from "./NotificationsPopoverAnon.js";
import AvatarPopoverAnon from "./AvatarPopoverAnon.js";

interface Props {
    onNavOpen: () => void;
}

const Header = ({ onNavOpen }: Props) => {
    const { isAuthenticated } = useAuth();
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));

    // TODO: Refactor to remove duplication
    const renderPopovers = isAuthenticated ? (
        <Stack direction="row" alignItems="center" spacing={0.9}>
            <Link to="/create/post">
                <RoundButton
                    text="write"
                    icon={<CreateIcon />}
                    variant="contained"
                    color="primary"
                />
            </Link>
            <SettingsPopover />
            <NotificationsPopover />
            <AvatarPopover />
        </Stack>
    ) : (
        <Stack direction="row" alignItems="center" spacing={0.9}>
            <Link to="/create/post">
                <RoundButton
                    text="write"
                    icon={<CreateIcon />}
                    variant="contained"
                    color="primary"
                />
            </Link>
            <SettingsPopover />
            <NotificationsPopoverAnon />
            <AvatarPopoverAnon />
        </Stack>
    );

    return (
        <>
            <div id="back-to-top-anchor"></div>
            <AppBar position="static" color="primary" sx={{ mb: 3 }}>
                <Toolbar
                    sx={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Box display="flex" alignItems="center">
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ display: { sm: "none" } }}
                            onClick={onNavOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Link to="/" style={{ display: "flex" }}>
                            <img
                                src={
                                    isMediumScreen
                                        ? HorizontalLogo
                                        : LogoMarkWhite
                                }
                                alt="logo"
                                height={isMediumScreen ? 32 : 38}
                                width={isMediumScreen ? "auto" : 38}
                                style={{ cursor: "pointer" }}
                            />
                        </Link>
                    </Box>
                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
                        <FeedMenu />
                        <RoundButton text="Prompts" />
                        <RoundButton text="Bookmarks" />
                    </Box>
                    {renderPopovers}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;
