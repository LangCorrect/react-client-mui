import { Navigate, Route, Routes } from "react-router-dom";
import PostPage from "./pages/PostPage.tsx";
import PostDetailPage from "./pages/PostDetailPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import LayoutWithContainer from "./layouts/LayoutWithContainer.tsx";
import LayoutWithoutContainer from "./layouts/LayoutWithoutContainer.tsx";
import IndexPage from "./pages/IndexPage.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import useAuth from "./hooks/useAuth.tsx";
import CreatePostPage from "./pages/CreatePostPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import MakeCorrectionPage from "./pages/MakeCorrectionPage.tsx";
import RankingPage from "./pages/RankingPage.tsx";

const RoutesList = () => {
    const authContext = useAuth();
    if (!authContext) {
        throw new Error("AuthContext missing");
    }

    const { isAuthenticated, userInfoLoaded } = authContext;

    // needed in order to render the layouts correctly.
    // read dev notes in context/AuthProvider
    if (!userInfoLoaded) return <p>Loading...</p>;

    return (
        <Routes>
            {/* Public Routes */}

            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

            <Route
                element={
                    !isAuthenticated ? (
                        <LayoutWithoutContainer />
                    ) : (
                        <LayoutWithContainer />
                    )
                }
            >
                <Route
                    path="/"
                    element={
                        !isAuthenticated ? (
                            <IndexPage />
                        ) : (
                            <PostPage mode="teach" title="Journals awaiting your correction" />
                        )
                    }
                />
            </Route>

            <Route element={<LayoutWithoutContainer />}>
                {!isAuthenticated && <Route path="/" element={<IndexPage />} />}
            </Route>

            {/* Mixed Routes */}

            <Route element={<LayoutWithContainer />}>
                <Route
                    path="/journals"
                    element={<PostPage mode="teach" title="Recently corrected journals" />}
                />
                <Route path="journals/:slug" element={<PostDetailPage />} />
                <Route path="rankings" element={<RankingPage />} />
            </Route>

            {/* Protected Routes */}

            <Route element={<RequireAuth />}>
                <Route element={<LayoutWithContainer />}>
                    <Route
                        path="teach"
                        element={
                            <PostPage
                                mode="teach"
                                title="Journals awaiting your correction"
                            />
                        }
                    />
                    <Route
                        path="learn"
                        element={
                            <PostPage
                                mode="learn"
                                title="Journals in the languages you’re studying"
                            />
                        }
                    />
                    <Route
                        path="feed/following"
                        element={
                            <PostPage
                                mode="following"
                                title="Journals from your following"
                            />
                        }
                    />
                    <Route path="create/post" element={<CreatePostPage />} />
                    <Route
                        path="journals/:slug/make-corrections"
                        element={<MakeCorrectionPage />}
                    />
                </Route>
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/404" />} />
            <Route element={<LayoutWithContainer />}>
                <Route path="404" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};

export default RoutesList;
