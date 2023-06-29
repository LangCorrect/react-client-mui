import { Typography, Button, Box, Avatar } from "@mui/material";
import { Stars, Mail } from "@mui/icons-material";
import { ICurrentUser } from "../../context/AuthProvider";

interface UserInfoProps {
    user: ICurrentUser;
}

const UserInfo = ({ user }: UserInfoProps) => {
    return (
        <>
            <Box
                display="flex"
                sx={{ flexWrap: "wrap" }}
                marginBottom={1}
                gap={2}
                rowGap={1}
            >
                {/* Avatar */}
                <Avatar
                    aria-label={user.username}
                    sx={{
                        fontSize: "3rem",
                        width: { xs: 100, md: 150 },
                        height: { xs: 100, md: 150 },
                        objectFit: "cover",
                        borderRadius: "50%",
                    }}
                >
                    {user.username.slice(0, 1)}
                </Avatar>
                <Box>
                    {/* Username */}
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="h5" color="primary">
                            {user.nick_name || user.username}
                        </Typography>
                        <Box
                            display={{ xs: "flex", md: "none" }}
                            alignItems="center"
                        >
                            {user.is_premium && <Stars color="primary" />}
                        </Box>
                    </Box>
                    <Typography variant="subtitle1" color="text.secondary">
                        @{user.username}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        2 followers
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        display={{ xs: "none", md: "block" }}
                    >
                        {/* Maybe put native languages and studying languages here */}
                    </Typography>
                    {/* Buttons */}
                    <Button
                        size="small"
                        variant="contained"
                        sx={{ marginRight: 1 }}
                    >
                        Follow
                    </Button>
                    <Button size="small" variant="contained">
                        <Mail />
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default UserInfo;
