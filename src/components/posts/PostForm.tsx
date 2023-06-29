import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import {
    Alert,
    Box,
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { PostFormValues } from "../../types";

const validationSchema = yup.object().shape({
    title: yup.string().max(60).required(),
    text: yup.string().min(50).required(),
    native_text: yup.string(),
    language: yup.string().required(),
    gender_of_narration: yup.string(),
    permission: yup.string(),
    // tags: yup.string(),
});

interface Props {
    post: PostFormValues | undefined;
    onSubmit: (data: PostFormValues) => Promise<AxiosResponse>;
    onDiscard: () => void;
}

const PostForm = ({ post, onSubmit, onDiscard }: Props) => {
    const navigate = useNavigate();
    const isEditing = post !== undefined && Object.keys(post).length > 0;
    const [errMsg, setErrMsg] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<PostFormValues>({
        resolver: yupResolver(validationSchema),
    });

    const authContext = useAuth();
    if (!authContext) {
        throw new Error("authContext missing");
    }

    const { currentUser } = authContext;

    const onSubmitHandler: SubmitHandler<PostFormValues> = async (data) => {
        try {
            const response = await onSubmit(data);
            reset();

            if (!isEditing) {
                const { slug } = response.data;
                navigate(`/journals/${slug}`);
            }
        } catch (err) {
            const error = err as Error | AxiosError;

            if (!isAxiosError(error)) {
                setErrMsg("An error has occured.");
            } else {
                if (!error?.response) {
                    setErrMsg("No server response");
                } else if (error.response?.status === 403) {
                    setErrMsg(error.response?.data?.detail);
                } else {
                    setErrMsg("Action failed. Try again.");
                }
            }
        }
    };

    return (
        <form method="post" onSubmit={handleSubmit(onSubmitHandler)}>
            <Stack spacing={3} mb={3}>
                <TextField
                    required
                    {...register("title")}
                    label="Title"
                    error={!!errors.title}
                    helperText={errors.title && String(errors.title?.message)}
                    defaultValue={post?.title}
                />
                <TextField
                    multiline
                    required
                    {...register("text")}
                    label="Write in your target language"
                    error={!!errors.text}
                    helperText={errors.text && String(errors.text?.message)}
                    defaultValue={post?.text || ""}
                />
                <TextField
                    multiline
                    {...register("native_text")}
                    label="Notes"
                    error={!!errors.native_text}
                    helperText={
                        errors.native_text &&
                        String(errors.native_text?.message)
                    }
                    defaultValue={post?.native_text || ""}
                />
                <FormControl error={!!errors.language} fullWidth required>
                    <InputLabel id="language">Language</InputLabel>
                    <Select
                        {...register("language")}
                        label="Language"
                        defaultValue={post?.language || ""}
                    >
                        {currentUser?.get_studying_languages?.map((lang) => (
                            <MenuItem key={lang.code} value={lang.code}>
                                {lang.en_name}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.language && (
                        <FormHelperText>
                            {String(errors.language.message)}
                        </FormHelperText>
                    )}
                </FormControl>
                <FormControl
                    error={!!errors.gender_of_narration}
                    fullWidth
                    required
                >
                    <InputLabel id="gender">Gender of Narration</InputLabel>
                    <Select
                        {...register("gender_of_narration")}
                        label="Gender of Narration"
                        defaultValue={post?.gender_of_narration || "U"}
                    >
                        <MenuItem value="M">Male</MenuItem>
                        <MenuItem value="F">Female</MenuItem>
                        <MenuItem value="O">Other</MenuItem>
                        <MenuItem value="U">Prefer not to say</MenuItem>
                    </Select>
                    {errors.gender_of_narration && (
                        <FormHelperText>
                            {String(errors.gender_of_narration.message)}
                        </FormHelperText>
                    )}
                </FormControl>
                <FormControl error={!!errors.permission} fullWidth required>
                    <InputLabel id="visibility">Visibility</InputLabel>
                    <Select
                        {...register("permission")}
                        label="Visibility"
                        defaultValue={post?.permission || "public"}
                    >
                        <MenuItem value="public">Viewable by everyone</MenuItem>
                        <MenuItem value="member">
                            Viewable only by registered members
                        </MenuItem>
                    </Select>
                    {errors.permission && (
                        <FormHelperText>
                            {String(errors.permission.message)}
                        </FormHelperText>
                    )}
                </FormControl>
            </Stack>

            {errMsg && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {errMsg}
                </Alert>
            )}

            <Box display="flex" justifyContent="end" gap={1}>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                        reset();
                        onDiscard();
                    }}
                >
                    {isEditing ? "Discard changes" : "Cancel"}
                </Button>
                <Button type="submit" variant="contained">
                    {isEditing ? "Save" : "Submit"}
                </Button>
            </Box>
        </form>
    );
};

export default PostForm;
