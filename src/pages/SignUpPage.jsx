import React from 'react';
import { Button, Container, Image, Input, VStack } from "@chakra-ui/react";
import { useUserStore } from "../store/user.js";
import { useNavigate } from 'react-router-dom';
import { toaster } from "../components/ui/toaster.jsx"
import logo from "../assets/ifb.png"

const SignUpPage = () => {
    const [newUser, setNewUser] = React.useState({
        name: "",
        nickname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();

    const { createUser } = useUserStore();

    const handleSubmit = async () => {
        const {success, message} = await createUser(newUser);
        if(!success) {
            toaster.create({description: message, title: 'Error', type: "error"});
        } else {
            toaster.create({description: message, title: 'Success', type: "success"});
            navigate("/");
        }
    }

    return (
        <Container 
            maxW={"container.sm"}
            centerContent
            w={"30%"}
            bg={"gray.300"}
            p={6} rounded={"lg"} shadow={"md"}
            mt={"2.5rem"}
        >
            <VStack>
                <Image 
                    src={logo} 
                    alt={"logo"} 
                    h={48} 
                />

                <VStack spacing={4} p={6}>
                        <Input
                            placeholder={"Name"}
                            name={"name"}
                            value={newUser.name}
                            onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                        />
                        <Input
                            placeholder={"Nickname"}
                            name={"nickname"}
                            value={newUser.nickname}
                            onChange={(e) => setNewUser({...newUser, nickname: e.target.value})}
                        />
                        <Input
                            placeholder={"Email"}
                            name={"email"}
                            type={"email"}
                            value={newUser.email}
                            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                        />
                        <Input
                            placeholder={"Password"}
                            name={"password"}
                            type={"password"}
                            value={newUser.password}
                            onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                        />
                        <Input
                            placeholder={"Confirm Password"}
                            name={"confirmPassword"}
                            type={"password"}
                            value={newUser.confirmPassword}
                            onChange={(e) => setNewUser({...newUser, confirmPassword: e.target.value})}
                        />
                    <Button onClick={handleSubmit} mt={"0.5rem"}>
                        Submit
                    </Button>
                </VStack>
            </VStack>
        </Container>
    );
};

export default SignUpPage;