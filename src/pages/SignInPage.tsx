import { Button, Container, Image, Input, LinkBox, Text, VStack } from "@chakra-ui/react";
import { Link, useNavigate } from 'react-router-dom';
import { toaster } from "../components/ui/toaster.jsx"
import { useState } from "react";
import { useAuthStore } from "@/store/auth";
import logo from "@/assets/logo.svg"

const SignInPage = () => {
    const [newUser, setNewUser] = useState({
        name: "",
        nickname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();

    const { register } = useAuthStore();

    const handleSubmit = async () => {
        const {success, message} = await register(newUser);
        if(!success) {
            toaster.create({description: message, title: 'Error', type: "error"});
        } else {
            toaster.create({description: message, title: 'Success', type: "success"});
            navigate("/");
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
    <VStack pb={0}>
        <Image src={logo} alt={"logo"} w={"25%"} objectFit="contain"/>

        <VStack spaceY={3} p={6}>
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
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <Input
                color={"black"}
                size="sm"
                px={".5rem"}
                py={".125rem"}
                fontSize="sm"
                bg="white"
                placeholder="Confirm Password"
                name="confirmPassword"
                type="password"
                value={newUser.confirmPassword}
                onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
            />
            <Button onClick={handleSubmit} mt={"0.5rem"} bg="cyan.600" color="white">
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