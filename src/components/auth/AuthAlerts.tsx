import { Alert } from "@mui/material";

interface Props {
    messages: string[];
}

const AuthAlerts = ({ messages }: Props) => {
    return (
        <>
            {messages.map((msg, idx) => (
                <Alert key={idx} severity="warning" sx={{ mb: 3 }}>
                    {msg}
                </Alert>
            ))}
        </>
    );
};

export default AuthAlerts;
