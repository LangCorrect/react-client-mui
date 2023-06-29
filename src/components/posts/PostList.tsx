import { Post } from "../../types.ts";
import PostPreview from "./PostPreview.tsx";
import PostPreviewSkeleton from "./PostPreviewSkeleton.tsx";

interface Props {
    posts: Post[];
    isLoading: boolean;
}

const POSTS_LENGTH = 20;

const PostList = ({ posts, isLoading }: Props) => {
    const renderPosts = isLoading
        ? Array.from({ length: POSTS_LENGTH }).map((_, idx) => (
              <PostPreviewSkeleton key={idx} />
          ))
        : posts.map((post) => <PostPreview key={post.id} post={post} />);

    return <>{renderPosts}</>;
};

export default PostList;
