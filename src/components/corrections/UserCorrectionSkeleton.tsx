import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    List,
    ListItem,
    Skeleton,
} from "@mui/material";

const UserCorrectionSkeleton = () => {
    return (
        <Card>
            <CardHeader
                avatar={
                    <Skeleton
                        animation="pulse"
                        variant="circular"
                        width={40}
                        height={40}
                    />
                }
                title={
                    <Skeleton
                        animation="pulse"
                        height={15}
                        width="10%"
                        style={{ marginBottom: 6 }}
                    />
                }
            />
            <Divider />
            <List disablePadding>
                <ListItem
                    sx={{
                        paddingTop: "1rem",
                        paddingBottom: "1rem",
                    }}
                >
                    <Skeleton
                        width="100%"
                        animation="pulse"
                        variant="rectangular"
                    />
                </ListItem>
                <Divider />
                <ListItem
                    sx={{
                        paddingTop: "1rem",
                        paddingBottom: "1rem",
                    }}
                >
                    <Skeleton
                        width="100%"
                        animation="pulse"
                        variant="rectangular"
                    />
                </ListItem>
                <Divider />
                <ListItem
                    sx={{
                        paddingTop: "1rem",
                        paddingBottom: "1rem",
                    }}
                >
                    <Skeleton
                        width="100%"
                        animation="pulse"
                        variant="rectangular"
                    />
                </ListItem>
                <Divider />
                <ListItem
                    sx={{
                        paddingTop: "1rem",
                        paddingBottom: "1rem",
                    }}
                >
                    <Skeleton
                        width="100%"
                        animation="pulse"
                        variant="rectangular"
                    />
                </ListItem>
                <Divider />
                <ListItem
                    sx={{
                        paddingTop: "1rem",
                        paddingBottom: "1rem",
                    }}
                >
                    <Skeleton
                        width="100%"
                        animation="pulse"
                        variant="rectangular"
                    />
                </ListItem>
                <Divider />
            </List>
            <CardContent />
        </Card>
    );
};

export default UserCorrectionSkeleton;
