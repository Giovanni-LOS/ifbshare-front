import { Button, Container, Flex, Image, Input, VStack } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { toaster } from "../components/ui/toaster.jsx";
import { useState } from "react";
import { useAuthStore } from "@/store/auth";
import logo from "@/assets/logo.svg";

const RequestPasswordPage = () => {
    const [user, setUser] = useState({
        email: ""
    });

    const navigate = useNavigate();
    const { requestPassword } = useAuthStore();

    const handleRequestPassword = async () => {
        const { success, message } = await requestPassword(user);
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

                    <Flex flexDir={"row"} justifyContent={"space-between"} alignItems="center" w="full">
                        <Button 
                            onClick={handleRequestPassword} 
                            mt={"0.5rem"} 
                            bg="cyan.600" 
                            color="white" 
                            _hover={{ bg: "cyan.700" }}
                            px={6}
                        >
                            Reset Password
                        </Button>

                        <Button 
                            onClick={() => navigate("/login")} 
                            mt={"0.5rem"} 
                            bg="cyan.600" 
                            color="white" 
                            _hover={{ bg: "cyan.700" }}
                            px={6}
                        >
                            Back
                        </Button>
                    </Flex>

                </VStack>
            </VStack>
        </Container>
    );
};

export default RequestPasswordPage;
