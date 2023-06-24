import { Alert, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Box from "@mui/material/Box";
import useAuth from "../../hooks/useAuth";
import { IAuthContext } from "../../context/AuthProvider";
import { AxiosError, isAxiosError } from "axios";
import AuthService from "../../service/auth.service";

const validationSchema = yup.object().shape({
    username: yup.string().min(6).max(26).required(),
    password: yup.string().min(8).max(32).required(),
});

const LoginForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const authContext = useAuth();
    const [errMsg, setErrMsg] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    if (!authContext) return <p>Loading...</p>;

    const { setAccessToken, setRefreshToken } = authContext as IAuthContext;

    const from = location.state?.from?.pathname || "/";

    const onSubmitHandler: SubmitHandler<FieldValues> = async (data) => {
        setErrMsg("");

        try {
            const resp = await AuthService.login(data.username, data.password);
            const { access, refresh } = resp.data;
            setAccessToken(access);
            setRefreshToken(refresh);

            navigate(from, { replace: true });
        } catch (err) {
            const error = err as Error | AxiosError;
            if (!isAxiosError(error)) {
                setErrMsg("An error has occured.");
            } else {
                if (!error?.response) {
                    setErrMsg("No server response");
                } else if (error.response?.status === 401) {
                    setErrMsg(error.response?.data?.detail);
                } else {
                    setErrMsg("Login failed");
                }
            }
        }
    };

    return (
        <>
            <form method="post" onSubmit={handleSubmit(onSubmitHandler)}>
                {errMsg && (
                    <Alert severity="warning" sx={{ mb: 3 }}>
                        {errMsg}
                    </Alert>
                )}

                <Stack spacing={3} mb={3}>
                    <TextField
                        required
                        {...register("username")}
                        label="Username"
                        error={!!errors.username}
                        helperText={
                            errors.username && String(errors.username.message)
                        }
                    />
                    <TextField
                        required
                        {...register("password")}
                        label="Password"
                        type="password"
                        error={!!errors.password}
                        helperText={
                            errors.password && String(errors.password.message)
                        }
                    />
                </Stack>

                <Box display="flex" justifyContent="end">
                    <Button type="submit" variant="contained">
                        Login
                    </Button>
                </Box>
            </form>
        </>
    );
};

export default LoginForm;
