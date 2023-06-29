import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Divider, SvgIconProps, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArticleIcon from "@mui/icons-material/Article";
import AddIcon from "@mui/icons-material/Add";
import { useQuery } from "@tanstack/react-query";
import RankingService from "../service/ranking.service";
import UserStat from "../components/rankings/UserStat";
import React from "react";

interface IRanking {
    username: string;
    total: number;
    posts: number;
    corrections: number;
}

const userStats: Array<{
    title: string;
    icon: React.ReactElement<SvgIconProps>;
    key: keyof IRanking;
}> = [
    { title: "Total contributions", icon: <AddIcon />, key: "total" },
    { title: "Entries published", icon: <ArticleIcon />, key: "posts" },
    {
        title: "Corrections published",
        icon: <CheckCircleOutlineIcon />,
        key: "corrections",
    },
];

const RankingPage = () => {
    const { isLoading, data } = useQuery({
        queryKey: ["rankings"],
        queryFn: RankingService.getRankings,
    });

    // TODO: Create a skeleton component
    if (isLoading) return <p>Loading...</p>;

    return (
        <>
            <Typography variant="h5">Rankings</Typography>

            <List>
                {data.map((ranking: IRanking) => (
                    <React.Fragment key={ranking.username}>
                        <ListItem key={ranking.username}>
                            <ListItemAvatar>
                                <Avatar alt={ranking.username}>
                                    {ranking.username.slice(0, 2)}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={ranking.username}
                                secondary="Member since 2022"
                            />

                            <List sx={{ display: "flex", gap: 2 }}>
                                {userStats.map(({ title, icon: Icon, key }) => (
                                    <UserStat
                                        key={key}
                                        title={title}
                                        value={ranking[key] as number}
                                        icon={Icon}
                                    />
                                ))}
                            </List>
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </>
    );
};

export default RankingPage;
