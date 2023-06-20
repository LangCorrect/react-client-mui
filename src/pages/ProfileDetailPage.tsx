import BootstrapContainer from "../components/BootstrapContainer";
import { Grid } from "@mui/material";
import { useState } from "react";
import mockPostsData from "../mockData/mockPosts";
import mockUserData from "../mockData/mockUser";
import { ICurrentUser } from "../context/AuthProvider";
import { PostInterface } from "./PostPage";
import UserContent from "../components/profile/UserContent";
import UserInfo from "../components/profile/UserInfo";
import { Theme } from "@mui/material/styles";

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
                    {/* Main content */}
                    <Grid
                        item
                        xs={12}
                        md={9}
                        order={{ xs: 2, md: 1 }}
                        paddingRight={{ xs: 0, md: 3 }}
                        sx={{
                            borderRight: (theme: Theme) => ({
                                xs: 0,
                                md: `1px solid ${theme.palette.divider}`,
                            }),
                        }}
                    >
                        <UserContent
                            user={user}
                            posts={posts}
                            tabValue={tabValue}
                            handleTabChange={handleTabChange}
                        />
                    </Grid>
                    {/* User info/ sidebar */}
                    <Grid
                        item
                        xs={12}
                        md={3}
                        order={{ xs: 1, md: 2 }}
                        sx={{
                            position: "sticky",
                            top: 0,
                            height: "fit-content",
                            bgcolor: "background.default",
                        }}
                        paddingLeft={{ xs: 0, md: 3 }}
                        paddingBottom={{ xs: 3, md: 0 }}
                    >
                        <UserInfo user={user} />
                    </Grid>
                </Grid>
            </BootstrapContainer>
        </>
    );
};

export default ProfileDetailPage;
