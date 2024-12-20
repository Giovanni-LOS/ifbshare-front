import { Box } from "@chakra-ui/react";
import { Route, Routes}  from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignInPage.js";
import LogInPage from "./pages/LogInPage.jsx";

function App() {

  return (
    <>
      <Box minH={"100vh"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<SignUpPage />} />
            <Route path="/login" element={<LogInPage />} />
        </Routes>
      </Box>
    </>
  )
}

export default App
