import { Card, CardContent, Typography } from "@mui/material";

interface Props {
    title: string;
    content: string | number;
}

const StatCard = ({ title, content }: Props) => (
    <Card variant="outlined">
        <CardContent
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Typography
                variant="h5"
                color="text.secondary"
                style={{ whiteSpace: "nowrap" }}
            >
                {title}
            </Typography>
            <Typography variant="h5" fontWeight="bold">
                {content}
            </Typography>
        </CardContent>
    </Card>
);

export default StatCard;
