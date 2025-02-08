import { Box, Container, Flex, HStack, Text  } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ColorModeButton } from "./ui/color-mode.jsx";
import "../global.css";
import logo from "../assets/icon.svg";
import {useUserProfileStore} from "@/store/user.ts";
import {useEffect, useState} from "react";
import { toaster } from "./ui/toaster.jsx";
import CreatePostButton from "./CreatePostButton";


const Navbar = () => {

    const [nickname, setNickname] = useState("Conta");
    const { getUserProfile, user } = useUserProfileStore();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const { success, message } = await getUserProfile();
            if(!success) {
                toaster.create({ description: message, title: 'Error', type: "error" });
            } else {
                setNickname(user.nickname);
            }
        };
        fetchUserProfile();
    }, [nickname]);



    return (
        <Container p="0" maxW="100vw" px={33} bg={{base: "var(--mint-green)", _dark: "var(--mint-green)"}}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base: "column",
                    sm: "row",
                }}
            >
                <HStack spaceX={2}>
                    <Link to={"/"}>
                    <img
                        src={logo}
                        alt="Logo"
                        width={50}
                        height={50}
                    />
                    </Link>

                    <Text
                        fontSize={"2xl"}
                        fontWeight={"bold"}
                        className="nabla-font"
                    >
                        <Link to={"/"}>IFB Share</Link>
                    </Text>

                    <Link to={"/"}>
                        <Text 
                            color="#333333" 
                            fontSize={"2xl"}
                        >
                            Home
                        </Text>
                    </Link>

                    <Link to={"/profile"}>
                        <Text 
                            color="#333333"
                            fontSize={"2xl"}
                        >
                            {nickname}
                        </Text>
                    </Link>

                    <HStack alignItems={"center"} gap={2}>
                        <Text
                            color="black"
                            fontSize={"md"}
                        >
                            Novo Post
                        </Text>
                        <CreatePostButton />
                    </HStack>
                </HStack>
                <ColorModeButton/>
            </Flex>
        </Container>
    );
};
export default Navbar;