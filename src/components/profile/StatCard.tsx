import { Card, CardContent, Typography } from "@mui/material";

interface StatCardProps {
    title: string;
    content: string;
}

const StatCard = ({ title, content }: StatCardProps) => (
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
