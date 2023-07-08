import { Typography, Box, Tabs, Tab } from "@mui/material";
import { Post, User } from "../../types";
import PostList from "../posts/PostList";
import UserAbout from "./UserAbout";
import PromptList from "../prompts/PromptList";
import { Prompt } from "../../types";
import PremiumIcon from "./PremiumIcon";

interface UserContentProps {
    user: User;
    posts: Post[];
    postsIsLoading: boolean;
    prompts: Prompt[];
    tabValue: number;
    handleTabChange: (_event: React.SyntheticEvent, newValue: number) => void;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const UserContent = ({
    user,
    posts,
    postsIsLoading,
    prompts,
    tabValue,
    handleTabChange,
}: UserContentProps) => {
    const tabProps = (index: number) => ({
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    });

    const TabPanel = (props: TabPanelProps) => {
        const { children, value, index } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
            >
                {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
            </div>
        );
    };

    return (
        <>
            {/* Displayed name */}
            <Box display={{ xs: "none", md: "flex" }} alignItems="center">
                <Typography variant="h3" color="primary" paddingRight={1}>
                    {user.nick_name || user.username}
                </Typography>
                {user.is_premium && <PremiumIcon fontSize="large" />}
            </Box>
            {/* Tabs */}
            <Box>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        aria-label="profile tabs"
                    >
                        <Tab label="Posts" {...tabProps(0)} />
                        <Tab label="Prompts" {...tabProps(1)} />
                        <Tab label="About" {...tabProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={tabValue} index={0}>
                    <PostList posts={posts} isLoading={postsIsLoading} />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <PromptList prompts={prompts} user={user} />
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    <UserAbout user={user} />
                </TabPanel>
            </Box>
        </>
    );
};

export default UserContent;
