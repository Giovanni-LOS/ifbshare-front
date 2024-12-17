import { Button, Container, Image, Input, LinkBox, Text, VStack } from "@chakra-ui/react";
import { Link, useNavigate } from 'react-router-dom';
import { toaster } from "../components/ui/toaster.jsx";
import { useState } from "react";
import { useAuthStore } from "@/store/auth";
import logo from "@/assets/logo.svg";

const LogInPage = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const { login } = useAuthStore();

    const handleLogin = async () => {
        const { success, message } = await login(user);
        if (!success) {
            toaster.create({ description: message, title: 'Error', type: "error" });
        } else {
            toaster.create({ description: message, title: 'Success', type: "success" });
            navigate("/");
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
                <Image src={logo} alt={"logo"} w={"25%"}/>

                <VStack spaceY={3} p={6} minW={"24rem"}>
                    <Input
                        color={"black"}
                        size="sm"
                        px={".5rem"}
                        py={".125rem"}
                        fontSize="sm"
                        bg="white"
                        placeholder="Email"
                        name="email"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                    <Input
                        color={"black"}
                        size="sm"
                        px={".5rem"}
                        py={".125rem"}
                        fontSize="sm"
                        bg="white"
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                    <Button 
                        onClick={handleLogin} 
                        mt={"0.5rem"} 
                        bg="cyan.600" 
                        color="white" 
                        size="lg"
                    >
                        Login
                    </Button>
                <LinkBox>
                    <Text>
                        Don't have an account?{" "}
                        <Link to={"/sign-in"} >
                            <Text 
                                color="cyan.600" 
                                _hover={{ color: "cyan.700" }}   
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                Sign In
                            </Text>
                        </Link>
                    </Text>
                </LinkBox>
                </VStack>
            </VStack>
        </Container>
    );
};

export default LogInPage;
