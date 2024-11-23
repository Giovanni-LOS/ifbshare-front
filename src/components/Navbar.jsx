import {Container, Flex, HStack, Text} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {ColorModeButton} from "./ui/color-mode.jsx";


const Navbar = () => {

    return (
        <Container maxW={"1140px"} px={4} bg={{base: "hsl(290, 15%, 80%)", _dark: "hsl(290, 80%, 15%)"}}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base: "column",
                    sm: "row",
                }}
            >
                <HStack spacing={2}>
                    <Text
                        fontSize={"2xl"}
                        fontWeight={"bold"}
                        fontFamily={"heading"}
                        color={"hsl(290, 100%, 50%)"}
                    >
                        <Link to={"/"}>IFB Share</Link>
                    </Text>
                </HStack>
                <ColorModeButton />
            </Flex>
        </Container>
    );
};
export default Navbar;