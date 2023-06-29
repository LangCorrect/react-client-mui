import {
    ListItem,
    ListItemAvatar,
    Skeleton,
    ListItemText,
    Divider,
} from "@mui/material";

const RankingSkeleton = () => {
    return (
        <>
            <ListItem>
                <ListItemAvatar>
                    <Skeleton
                        animation="pulse"
                        variant="circular"
                        width={40}
                        height={40}
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Skeleton
                            width="100%"
                            animation="pulse"
                            variant="rectangular"
                        />
                    }
                />
            </ListItem>
            <Divider />
        </>
    );
};

export default RankingSkeleton;
