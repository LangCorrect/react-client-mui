import BootstrapContainer from "../components/BootstrapContainer";
import { Grid } from "@mui/material";
import { useState } from "react";
import UserContent from "../components/profile/UserContent";
import UserInfo from "../components/profile/UserInfo";
import { Theme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import UserService from "../service/user.service";
import { useQueries } from "@tanstack/react-query";
import PostService from "../service/post.service";

interface Params {
    username: string;
}

const ProfileDetailPage = () => {
    const { username } = useParams<keyof Params>() as Params;

    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (
        _event: React.SyntheticEvent,
        newValue: number,
    ) => {
        setTabValue(newValue);
    };

    const [
        userQuery,
        postsQuery,
        promptsQuery,
        followersQuery,
        followingsQuery,
    ] = useQueries({
        queries: [
            {
                queryKey: ["user", username],
                queryFn: () => UserService.getUser(username),
            },
            {
                queryKey: ["userPosts", username],
                queryFn: () => PostService.getUserPosts(username),
            },
            {
                queryKey: ["userPrompts", username],
                queryFn: () => UserService.getUserPrompts(username),
            },
            {
                queryKey: ["userFollowers", username],
                queryFn: () => UserService.getUserFollowers(username),
            },
            {
                queryKey: ["userFollowings", username],
                queryFn: () => UserService.getUserFollowings(username),
            },
        ],
    });

    if (
        userQuery.isLoading ||
        postsQuery.isLoading ||
        promptsQuery.isLoading ||
        followersQuery.isLoading ||
        followingsQuery.isLoading
    )
        return <div>Loading...</div>;

    if (
        userQuery.error ||
        postsQuery.error ||
        promptsQuery.error ||
        followersQuery.error ||
        followingsQuery.error
    )
        return <div>Loading...</div>;

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
                            user={userQuery.data}
                            posts={postsQuery.data}
                            prompts={promptsQuery.data}
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
                        paddingBottom={{ xs: 1, md: 0 }}
                    >
                        <UserInfo
                            user={userQuery.data}
                            followers={followersQuery.data}
                            followings={followingsQuery.data}
                        />
                    </Grid>
                </Grid>
            </BootstrapContainer>
        </>
    );
};

export default ProfileDetailPage;
