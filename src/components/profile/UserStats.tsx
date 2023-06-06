import { Grid } from "@mui/material";
import StatCard from "./StatCard";

const mockStats = [
    {
        id: 0,
        title: "Corrections made",
        content: "215",
    },
    {
        id: 1,
        title: "Corrections received",
        content: "307",
    },
    {
        id: 2,
        title: "Ratio",
        content: "0.7%",
    },
    {
        id: 3,
        title: "Longest streak",
        content: "8",
    },
];

const UserStats = () => (
    <>
        <Grid container spacing={1}>
            {mockStats.map(({ id, title, content }) => (
                <Grid item xs={12} md={6}>
                    <StatCard
                        key={id}
                        title={title}
                        content={content}
                    ></StatCard>
                </Grid>
            ))}
        </Grid>
    </>
);

export default UserStats;
