import { PostInterface } from "../../pages/PostPage.tsx";
import PostPreview from "./PostPreview.tsx";
import PostPreviewSkeleton from "./PostPreviewSkeleton.tsx";

interface PostListInterface {
    posts: PostInterface[];
    isLoading: boolean;
}

const POSTS_LENGTH = 20;

const PostList = ({ posts, isLoading }: PostListInterface) => {
    const renderPosts = isLoading
        ? Array.from({ length: POSTS_LENGTH }).map((_, idx) => (
              <PostPreviewSkeleton key={idx} />
          ))
        : posts?.map((post) => <PostPreview key={post.id} post={post} />);

    return <>{renderPosts}</>;
};

export default PostList;
