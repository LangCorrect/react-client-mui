import { Box, Button, FormHelperText, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { GENDER_OPTIONS, LANGUAGE_OPTIONS, LEVEL_OPTIONS } from "./formData";
import AuthAlerts from "./AuthAlerts";

interface FormDataInterface extends FieldValues {
    username: string;
    password: string;
    password2: string;
    email: string;
    native_language: string;
    studying_language: string;
    studying_level: string;
    gender: string;
}

const validationSchema = yup.object().shape({
    username: yup.string().min(6).max(16).required(),
    password: yup.string().min(8).max(32).required(),
    password2: yup.string().min(8).max(32).required(),
    email: yup.string().email().required(),
    native_language: yup.string().required(),
    studying_language: yup.string().required(),
    studying_level: yup.string().required(),
    gender: yup.string().required(),
});

interface Props {
    onRegister: (formData: FormDataInterface) => void;
}

const RegisterForm = ({ onRegister }: Props) => {
    const navigate = useNavigate();

    const [registrationErrors, setRegistrationErrors] = useState<
        string[] | null
    >(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmitHandler: SubmitHandler<FieldValues> = async (data) => {
        setRegistrationErrors(null);

        try {
            const formData = data as FormDataInterface;
            await onRegister(formData);
            navigate("/login");
            reset();
        } catch (err: any) {
            setRegistrationErrors(Object.values(err[0]));
        }
    };

    return (
        <>
            <form method="post" onSubmit={handleSubmit(onSubmitHandler)}>
                {registrationErrors && (
                    <AuthAlerts messages={registrationErrors} />
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
                        {...register("email")}
                        label="Email"
                        error={!!errors.email}
                        helperText={
                            errors.email && String(errors.email.message)
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

                    <TextField
                        required
                        {...register("password2")}
                        label="Re-enter your password"
                        type="password"
                        error={!!errors.password2}
                        helperText={
                            errors.password2 && String(errors.password2.message)
                        }
                    />

                    <FormControl
                        error={!!errors.native_language}
                        fullWidth
                        required
                    >
                        <InputLabel id="demo-simple-select-label">
                            Native Language
                        </InputLabel>
                        <Select
                            {...register("native_language")}
                            label="Native Language"
                            defaultValue=""
                        >
                            {LANGUAGE_OPTIONS.map((lang) => (
                                <MenuItem key={lang[0]} value={lang[0]}>
                                    {lang[1]}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.native_language && (
                            <FormHelperText>
                                {String(errors.native_language.message)}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <FormControl
                        error={!!errors.studying_language}
                        fullWidth
                        required
                    >
                        <InputLabel id="demo-simple-select-label">
                            Studying Language
                        </InputLabel>
                        <Select
                            {...register("studying_language")}
                            label="Studying Language"
                            defaultValue=""
                        >
                            {LANGUAGE_OPTIONS.map((lang) => (
                                <MenuItem key={lang[0]} value={lang[0]}>
                                    {lang[1]}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.studying_language && (
                            <FormHelperText>
                                {String(errors.studying_language.message)}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <FormControl
                        error={!!errors.studying_level}
                        fullWidth
                        required
                    >
                        <InputLabel id="demo-simple-select-label">
                            Studying Level
                        </InputLabel>
                        <Select
                            {...register("studying_level")}
                            label="Studying Level"
                            defaultValue=""
                        >
                            {LEVEL_OPTIONS.map((level) => (
                                <MenuItem key={level[0]} value={level[0]}>
                                    {level[1]}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.studying_level && (
                            <FormHelperText>
                                {String(errors.studying_level.message)}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <FormControl error={!!errors.gender} fullWidth required>
                        <InputLabel id="demo-simple-select-label">
                            Gender of Narration
                        </InputLabel>
                        <Select
                            {...register("gender")}
                            label="Gender of Narration"
                            defaultValue=""
                        >
                            {GENDER_OPTIONS.map((gender) => (
                                <MenuItem key={gender[0]} value={gender[0]}>
                                    {gender[1]}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.gender && (
                            <FormHelperText>
                                {String(errors.gender.message)}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Stack>

                <Box display="flex" justifyContent="end">
                    <Button type="submit" variant="contained">
                        Register
                    </Button>
                </Box>
            </form>
        </>
    );
};

export default RegisterForm;
