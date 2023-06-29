import { Prompt } from "./Prompt";

interface PromptListProps {
    prompts: Prompt[];
}

const PromptList = ({ prompts }: PromptListProps) => {
    return (
        <>
            {prompts.map((prompt) => (
                <div key={prompt.id}>{prompt.content}</div>
            ))}
        </>
    );
};

export default PromptList;
