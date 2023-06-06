import BootstrapContainer from "../components/BootstrapContainer";
import { Typography, Grid, Button, Box } from "@mui/material";
import { Stars, Mail } from "@mui/icons-material";
import { useState } from "react";
import mockPostsData from "../mockData/mockPosts";
import mockUserData from "../mockData/mockUser";
import { ICurrentUser } from "../context/AuthProvider";
import { PostInterface } from "./PostPage";
import UserContent from "../components/profile/UserContent";

interface ProfileDetailPageProps {
    user: ICurrentUser;
    posts: PostInterface[];
}

const ProfileDetailPage = ({
    user = mockUserData,
    posts = mockPostsData,
}: ProfileDetailPageProps) => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (
        _event: React.SyntheticEvent,
        newValue: number,
    ) => {
        setTabValue(newValue);
    };

    return (
        <>
            <BootstrapContainer>
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        md={9}
                        order={{ xs: 2, md: 1 }}
                        paddingRight={3}
                    >
                        <UserContent
                            user={user}
                            posts={posts}
                            tabValue={tabValue}
                            handleTabChange={handleTabChange}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={3}
                        order={{ xs: 1, md: 2 }}
                        borderLeft={{ xs: 0, md: "1px solid lightgrey" }}
                        paddingLeft={{ xs: 0, md: 3 }}
                    >
                        <Grid container marginBottom={1}>
                            <Grid
                                item
                                xs={4}
                                md={12}
                                container
                                alignItems="center"
                                marginBottom={1}
                            >
                                <Box
                                    component="img"
                                    src="https://thumb9.shutterstock.com/image-photo/stock-photo-head-shot-portrait-close-up-smiling-confident-businessman-wearing-glasses-looking-at-camera-250nw-1714666150.jpg"
                                    alt="profile-pic"
                                    sx={{
                                        width: { xs: 100, md: 150 },
                                        height: { xs: 100, md: 150 },
                                        objectFit: "cover",
                                        borderRadius: "50%",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={8} md={12}>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Typography variant="h5" color="primary">
                                        {user.nick_name}
                                    </Typography>
                                    <Box
                                        display={{ xs: "flex", md: "none" }}
                                        alignItems="center"
                                    >
                                        {user.is_premium && (
                                            <Stars color="primary" />
                                        )}
                                    </Box>
                                </Box>
                                <Typography
                                    variant="subtitle1"
                                    color="text.secondary"
                                >
                                    2 followers
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color="text.secondary"
                                    display={{ xs: "none", md: "block" }}
                                >
                                    {user.bio}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Box display="flex" gap={1}>
                            <Button size="small" variant="contained">
                                Follow
                            </Button>
                            <Button size="small" variant="contained">
                                <Mail />
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </BootstrapContainer>
        </>
    );
};

export default ProfileDetailPage;
