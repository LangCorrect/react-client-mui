import { User } from "../../types";
import PromptPreview, { Prompt } from "./PromptPreview";

interface PromptListProps {
    prompts: Prompt[];
    user: User;
}

const PromptList = ({ prompts, user }: PromptListProps) => {
    return (
        <>
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
        </>
    );
};

export default PromptList;
