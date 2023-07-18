import { Card, Typography } from '@mui/material';

export interface EmptyInterface {
    message: string;
}

const EmptyState = ({ message }: EmptyInterface) => {
    return (
       <Card sx={{ height: "60vh", display: "flex" }}>
            <Typography variant='h6' fontWeight={400} alignItems="center" margin={"auto"}>
                {message}
            </Typography>
        </Card>
    )
}

export default EmptyState;
