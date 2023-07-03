import { User } from "../../types";
import PromptPreview from "./PromptPreview";
import { Prompt } from "../../types";
import { Box } from "@mui/material";

interface Props {
    prompts: Prompt[];
    user: User;
}

const PromptList = ({ prompts, user }: Props) => {
    return (
        <Box display="flex" flexDirection="column" rowGap={3}>
            {prompts.length ? (
                prompts.map((prompt) => (
                    <PromptPreview prompt={prompt} key={prompt.id} />
                ))
            ) : (
                <div>
                    {user.nick_name || user.username} has not written any
                    prompts.
                </div>
            )}
        </Box>
    );
};

export default PromptList;
