import PromptPreview, { Prompt } from "./PromptPreview";

interface PromptListProps {
    prompts: Prompt[];
}

const PromptList = ({ prompts }: PromptListProps) => {
    return (
        <>
            {prompts.map((prompt) => (
                <PromptPreview prompt={prompt} key={prompt.id} />
            ))}
        </>
    );
};

export default PromptList;
