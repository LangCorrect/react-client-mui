import { Divider, Grid, Typography, Box } from "@mui/material";
import StatCard from "./StatCard";
import { User } from "../../types";
import { Info } from "@mui/icons-material";

interface UserAboutProps {
    user: User;
}

interface InfoHeaderProps {
    header: string;
}

interface Language {
    code: string;
    en_name: string;
}

interface UserAboutMeProps {
    user: User;
}

interface UserStatsProps {
    user: User;
}

const InfoHeader = ({ header }: InfoHeaderProps) => (
    <Box display="flex" alignItems="center" gap={1} marginBottom={1}>
        <Info color="primary" />
        <Typography variant="body1" color="text.secondary">
            {header}
        </Typography>
    </Box>
);

const UserAboutMe = ({ user }: UserAboutMeProps) => {
    const renderedLanguages = (langs: Language[]) => {
        const lastId = langs.length - 1;
        return langs.map((lang, id) => (
            <span key={lang["en_name"]}>
                {id === lastId ? `${lang["en_name"]}.` : `${lang["en_name"]}, `}
            </span>
        ));
    };

    const nativeLanguages = user.get_native_languages;
    const studyingLanguages = user.get_studying_languages;

    return (
        <Box>
            <InfoHeader header="About me" />
            <Typography
                marginBottom={1}
                sx={{ wordWrap: "break-word", textIndent: 31 }}
            >
                {user.bio}
            </Typography>
            <Box>
                <Typography color="text.secondary" display="inline">
                    Native language(s):{" "}
                </Typography>
                <Typography display="inline">
                    {renderedLanguages(nativeLanguages)}
                </Typography>
            </Box>
            <Box>
                <Typography color="text.secondary" display="inline">
                    Learning:{" "}
                </Typography>
                <Typography display="inline">
                    {renderedLanguages(studyingLanguages)}
                </Typography>
            </Box>
        </Box>
    );
};

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
        <Box>
            <InfoHeader header="My stats" />
            <Grid container spacing={1}>
                {stats.map(({ id, title, content }) => (
                    <Grid key={id} item xs={12} md={6}>
                        <StatCard title={title} content={content}></StatCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

const UserAbout = ({ user }: UserAboutProps) => {
    return (
        <>
            <Box display="flex" flexDirection="column" rowGap={2}>
                <UserAboutMe user={user} />
                <Divider />
                <UserStats user={user} />
            </Box>
        </>
    );
};

export default UserAbout;
