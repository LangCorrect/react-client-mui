import { Typography, Button, Box, Avatar } from "@mui/material";
import { Mail } from "@mui/icons-material";
import { Followers, Following, User } from "../../types";
import PremiumIcon from "./PremiumIcon";

interface UserInfoProps {
    user: User;
    followers: Followers;
    followings: Following;
}

interface UserAvatarProps {
    user: User;
}

interface UserDisplayedNameProps {
    user: User;
}

interface UserFollowsProps {
    followers: Followers;
    followings: Following;
}

const UserAvatar = ({ user }: UserAvatarProps) => (
    <Avatar
        aria-label={user.username}
        sx={{
            fontSize: "3rem",
            width: { xs: 100, md: 150 },
            height: { xs: 100, md: 150 },
        }}
    >
        {user.username.slice(0, 1)}
    </Avatar>
);

const UserDisplayedName = ({ user }: UserDisplayedNameProps) => (
    <Box display="flex" alignItems="center" gap={1} rowGap={0}>
        <Typography variant="h5" color="primary">
            {user.nick_name || user.username}
        </Typography>
        <Box display={{ xs: "flex", md: "none" }} alignItems="center">
            {user.is_premium && <PremiumIcon />}
        </Box>
    </Box>
);

const UserFollows = ({ followers, followings }: UserFollowsProps) => (
    <Box display="flex" gap={1} flexWrap="wrap" rowGap={0} marginBottom={1}>
        <Box>
            <Typography
                fontWeight="bold"
                color="text.secondary"
                display="inline"
            >
                {followers.count}{" "}
            </Typography>
            <Typography color="text.secondary" display="inline">
                followers
            </Typography>
        </Box>
        <Box>
            <Typography
                fontWeight="bold"
                color="text.secondary"
                display="inline"
            >
                {followings.count}{" "}
            </Typography>
            <Typography color="text.secondary" display="inline">
                following
            </Typography>
        </Box>
    </Box>
);

const UserButtons = () => (
    <Box display="flex" flexWrap="wrap" gap={1}>
        <Button size="small" variant="contained">
            Follow
        </Button>
        <Button size="small" variant="contained">
            <Mail />
        </Button>
    </Box>
);

const UserInfo = ({ user, followers, followings }: UserInfoProps) => {
    return (
        <>
            <Box
                display="flex"
                sx={{ flexWrap: "wrap" }}
                marginBottom={1}
                gap={2}
                rowGap={1}
            >
                <UserAvatar user={user} />
                <Box>
                    <UserDisplayedName user={user} />
                    <Typography color="text.secondary">
                        @{user.username}
                    </Typography>
                    <UserFollows
                        followers={followers}
                        followings={followings}
                    />
                    <UserButtons />
                </Box>
            </Box>
        </>
    );
};

export default UserInfo;
