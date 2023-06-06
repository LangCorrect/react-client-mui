import BootstrapContainer from "../components/BootstrapContainer";
import { Grid } from "@mui/material";
import { useState } from "react";
import mockPostsData from "../mockData/mockPosts";
import mockUserData from "../mockData/mockUser";
import { ICurrentUser } from "../context/AuthProvider";
import { PostInterface } from "./PostPage";
import UserContent from "../components/profile/UserContent";
import UserInfo from "../components/profile/UserInfo";

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
                        <UserInfo user={user} />
                    </Grid>
                </Grid>
            </BootstrapContainer>
        </>
    );
};

export default ProfileDetailPage;
