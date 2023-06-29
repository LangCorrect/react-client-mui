import Article from "./Article";
import { CardContent } from "@mui/material";
import PostForm from "./PostForm";
import { AxiosResponse } from "axios";
import { PostFormValues } from "../../types";

interface Props {
    post: PostFormValues;
    isEditing: boolean;
    onSubmit: (data: PostFormValues) => Promise<AxiosResponse>;
    onDiscard: () => void;
}

const EditableArticle = ({ post, isEditing, onSubmit, onDiscard }: Props) => {
    return (
        <>
            {isEditing ? (
                <CardContent>
                    <PostForm
                        post={post}
                        onSubmit={onSubmit}
                        onDiscard={onDiscard}
                    />
                </CardContent>
            ) : (
                <Article
                    title={post.title}
                    text={post.text}
                    nativeText={post.native_text}
                />
            )}
        </>
    );
};

export default EditableArticle;
