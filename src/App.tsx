import { Box } from "@chakra-ui/react";
import { Route, Routes}  from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignInPage";
import LogInPage from "./pages/LogInPage";
import RequestPasswordPage from "./pages/RequestPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import VerifyEmailPage from "./pages/VerifyEmail";

function App() {

  return (
    <>
      <Box minH={"100vh"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<SignUpPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/request-password" element={<RequestPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
        </Routes>
      </Box>
    </>
  )
}

export default App
