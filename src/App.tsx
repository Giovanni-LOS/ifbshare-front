import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignInPage";
import LogInPage from "./pages/LogInPage";
import RequestPasswordPage from "./pages/RequestPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import VerifyEmailPage from "./pages/VerifyEmail";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import PostPage from "./pages/PostPage";
import CreatePostPage from "./pages/CreatePostPage";
import UpdatePostPage from "./pages/UpdatePostPage";

function App() {
  return (
    <>
      <Box minH={"100vh"}>
        <Routes>
          <Route path="/" element={<Box><Navbar /><HomePage /></Box>} />
          <Route path="/sign-in" element={<SignUpPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/request-password" element={<RequestPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/profile" element={<Box><Navbar /><ProfilePage /></Box>} />
          <Route path="/post/:id" element={<Box><Navbar /><PostPage/></Box>} />
          <Route path="/create-post" element={<Box><Navbar /><CreatePostPage/></Box>} />
          <Route path="/update-post/:id" element={<Box><Navbar /><UpdatePostPage/></Box>} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
