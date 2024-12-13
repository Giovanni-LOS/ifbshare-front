import { Container, Flex, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ColorModeButton } from "./ui/color-mode.jsx";


const Navbar = () => {

    return (
        <Container maxW={"100%"} px={4} bg={{base: "var(--mauve)", _dark: "var(--purple)"}}>
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
                    <Text
                        fontSize={"2xl"}
                        fontWeight={"bold"}
                        fontFamily={"heading"}
                        color={"var(--phlox)"}
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