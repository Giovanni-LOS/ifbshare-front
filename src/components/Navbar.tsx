import { Container, Flex, HStack, Text  } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ColorModeButton } from "./ui/color-mode.jsx";
import "../global.css";
import logo from "../assets/icon.svg";
import {useUserProfileStore} from "@/store/user.ts";
import {useEffect, useState} from "react";


const Navbar = () => {

    const [nickname, setNickname] = useState("");
    const { getUserProfile } = useUserProfileStore();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const data = await getUserProfile();
            setNickname(data.data.nickname);
        };
        fetchUserProfile();
    }, []);



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
                    <Link to={"/"}>Home</Link>
                    <Link to={"/account"}>{nickname}</Link>
                </HStack>
                <ColorModeButton/>
            </Flex>
        </Container>
    );
};
export default Navbar;