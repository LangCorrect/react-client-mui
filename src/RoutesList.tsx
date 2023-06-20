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
import ProfileDetailPage from "./pages/ProfileDetailPage.tsx";

const RoutesList = () => {
    const authContext = useAuth();
    if (!authContext) {
        throw new Error("AuthContext missing");
    }

    const { currentUser, isAuthenticated, userInfoLoaded } = authContext;

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
                            <PostPage mode="teach" />
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
                    element={
                        <PostPage
                            mode={currentUser ? "teach" : "recentlyCorrected"}
                        />
                    }
                />
                <Route path="journals/:slug" element={<PostDetailPage />} />
                <Route path="users/:user" element={<ProfileDetailPage />} />
            </Route>

            {/* Protected Routes */}

            <Route element={<RequireAuth />}>
                <Route element={<LayoutWithContainer />}>
                    <Route path="teach" element={<PostPage mode="teach" />} />
                    <Route path="learn" element={<PostPage mode="learn" />} />
                    <Route path="create/post" element={<CreatePostPage />} />
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
