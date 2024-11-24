import { Box } from "@chakra-ui/react";
import { Route, Routes}  from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {

  return (
    <>
      <Box minH={"100vh"}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<SignInPage />} />
        </Routes>
      </Box>
    </>
  )
}

export default App
