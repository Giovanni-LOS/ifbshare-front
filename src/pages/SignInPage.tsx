import { Button, Container, Image, Input, LinkBox, Text, VStack, IconButton, Box } from "@chakra-ui/react";
import { Link, useNavigate } from 'react-router-dom';
import { toaster } from "../components/ui/toaster.jsx"
import { useState } from "react";
import { useAuthStore } from "@/store/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "@/assets/logo.svg"

const SignInPage = () => {
    const [newUser, setNewUser] = useState({
        name: "",
        nickname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const { register } = useAuthStore();

    const handleSubmit = async () => {
        const {success, message} = await register(newUser);
        if(!success) {
            toaster.create({description: message, title: 'Error', type: "error"});
        } else {
            toaster.create({description: message, title: 'Success', type: "success", duration: 10000, meta: { closable: true }});
            navigate("/login");
        }
    }

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
                        placeholder="Name"
                        name="name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        w="sm"
                    />
                    <Input
                        color={"black"}
                        size="sm"
                        px={".5rem"}
                        py={".125rem"}
                        fontSize="sm"
                        bg="white"
                        placeholder="Nickname"
                        name="nickname"
                        value={newUser.nickname}
                        onChange={(e) => setNewUser({ ...newUser, nickname: e.target.value })}
                    />
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
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                    <Box position="relative" width="100%">
                        <Input
                            color={"black"}
                            size="sm"
                            px={".5rem"}
                            py={".125rem"}
                            fontSize="sm"
                            bg="white"
                            placeholder="Password(at least 8 with letters, numbers, and symbols)"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
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
                            value={newUser.confirmPassword}
                            onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
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
                    <Button onClick={handleSubmit} mt={"0.5rem"} bg="cyan.600" _hover={{ bg: "cyan.700" }} color="white" size="lg" w={"100%"}>
                        Register
                    </Button>
                    <LinkBox>
                        <Text>
                            Have an account?{" "}
                            <Link to={"/login"} >
                                <Text color="cyan.600" _hover={{ color: "cyan.700" }} display={"inline"}>
                                    Login
                                </Text>
                            </Link>
                        </Text>
                    </LinkBox>
                </VStack>
            </VStack>
    </Container>
    );
};

export default SignInPage;