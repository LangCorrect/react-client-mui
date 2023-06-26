import { Grid } from "@mui/material";
import StatCard from "./StatCard";
import { ICurrentUser } from "../../context/AuthProvider";

interface UserStatsProps {
    user: ICurrentUser;
}

const UserStats = ({ user }: UserStatsProps) => {
    const correctionsMade = user.corrections_made_count;
    const correctionsRecieved = user.corrections_received_count;
    const correctionRatio = user.correction_ratio;
    const contributionsCount = user.contributions_count;
    const postsCount = user.posts_count;
    const promptsCount = user.prompts_count;

    const stats = [
        {
            id: 0,
            title: "Corrections made",
            content: correctionsMade,
        },
        {
            id: 1,
            title: "Corrections received",
            content: correctionsRecieved,
        },
        {
            id: 2,
            title: "Corrections Ratio",
            content: correctionRatio,
        },
        {
            id: 3,
            title: "Contributions",
            content: contributionsCount,
        },
        {
            id: 4,
            title: "Posts Count",
            content: postsCount,
        },
        {
            id: 5,
            title: "Prompts Count",
            content: promptsCount,
        },
    ];

    return (
        <>
            <Grid container spacing={1}>
                {stats.map(({ id, title, content }) => (
                    <Grid key={id} item xs={12} md={6}>
                        <StatCard title={title} content={content}></StatCard>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default UserStats;
