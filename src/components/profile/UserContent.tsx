import { Typography, Box, Tabs, Tab } from "@mui/material";
import { Stars } from "@mui/icons-material";
import { ICurrentUser } from "../../context/AuthProvider";
import { PostInterface } from "../../pages/PostPage";
import PostList from "../posts/PostList";
import UserStats from "./UserStats";

interface UserContentProps {
    user: ICurrentUser;
    posts: PostInterface[];
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
                {value === index && (
                    <Box sx={{ py: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    };

    return (
        <>
            <Box display={{ xs: "none", md: "flex" }} alignItems="center">
                <Typography variant="h3" color="primary" paddingRight={1}>
                    {user.nick_name}
                </Typography>
                {user.is_premium && <Stars color="primary" fontSize="large" />}
            </Box>
            <Box>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        aria-label="profile tabs"
                    >
                        <Tab label="Posts" {...tabProps(0)} />
                        <Tab label="Prompts" {...tabProps(1)} />
                        <Tab label="Stats" {...tabProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={tabValue} index={0}>
                    <PostList posts={posts} isLoading={false} />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    Display my prompts
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    <UserStats />
                </TabPanel>
            </Box>
        </>
    );
};

export default UserContent;
