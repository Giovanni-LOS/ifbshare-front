import { Button, Container, Flex, Image, Input, VStack, IconButton, Box } from "@chakra-ui/react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toaster } from "../components/ui/toaster.jsx";
import { useState } from "react";
import { useAuthStore } from "@/store/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "@/assets/logo.svg";

const ResetPasswordPage = () => {
    const [params] = useSearchParams();
    const [user, setUser] = useState({
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const token = params.get("token") ?? "";
    const expire = params.get("expire") ?? "";

    const navigate = useNavigate();
    const { resetPassword } = useAuthStore();

    const handleResetPassword = async () => {
        const { success, message } = await resetPassword(user, token, expire);
        if (!success) {
            toaster.create({ description: message, title: 'Error', type: "error" });
        } else {
            toaster.create({ description: message, title: 'Success', type: "success" });
            navigate("/login");
        }
    };

    return (
        <Container 
            maxW="container.xl"
            h="100vh"      
            px={8}  
            py={6}  
            centerContent
        >
            <VStack>
                <Image src={logo} alt={"logo"} w={"25%"} objectFit="contain"/>

                <VStack spaceY={3} p={6} minW={"24rem"}>
                    <Box position="relative" width="100%">
                        <Input
                            color={"black"}
                            size="sm"
                            px={".5rem"}
                            py={".125rem"}
                            fontSize="sm"
                            bg="white"
                            placeholder="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            width="100%"
                        />
                        <IconButton
                            position="absolute"
                            right={0}
                            top={0}
                            size="sm"
                            bg="transparent"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash color={"black"} /> : <FaEye  color={"black"}/>}
                        </IconButton>
                    </Box>
                    <Box position="relative" width="100%">
                        <Input
                            color={"black"}
                            size="sm"
                            px={".5rem"}
                            py={".125rem"}
                            fontSize="sm"
                            bg="white"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={user.confirmPassword}
                            onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                            width="100%"
                        />
                        <IconButton
                            position="absolute"
                            right={0}
                            top={0}
                            size="sm"
                            bg="transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <FaEyeSlash color={"black"} /> : <FaEye  color={"black"}/>}
                        </IconButton>
                    </Box>

                    <Button 
                        onClick={handleResetPassword} 
                        mt={"0.5rem"} 
                        bg="cyan.600" 
                        color="white" 
                        _hover={{ bg: "cyan.700" }}
                        w={"100%"}
                    >
                        Save
                    </Button>

                </VStack>
            </VStack>
        </Container>
    );
};

export default ResetPasswordPage;
