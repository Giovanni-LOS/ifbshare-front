import { Button, Container, VStack, Text, Flex } from "@chakra-ui/react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toaster } from "../components/ui/toaster.jsx";
import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";
import { MdOutlineMarkEmailRead } from "react-icons/md";


const VerifyEmailPage = () => {
    const [params] = useSearchParams();
    const token = params.get("token") ?? "";
    const expire = params.get("expire") ?? "";

    const navigate = useNavigate();
    const { verifyEmail } = useAuthStore();

    useEffect(() => {
        handleVerifyEmail();
    }, [token, expire]);

    const handleVerifyEmail = async () => {
        const { success, message } = await verifyEmail(token, expire);
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
      mt={"20vh"}
      centerContent
    >
      <VStack spaceY={3} padding={6} textAlign="center" w={"sm"}>
        <Flex alignItems={"center"} justifyContent={"center"} direction={"column"}>
            <MdOutlineMarkEmailRead size={"60%"} color="rgba(0, 0, 0, 0.3)"/>
        
            <Text fontSize="md" color="gray.400" mt={"-0.5rem"}>
            Your email has been verified.
            </Text>
        </Flex>
        
        <Button 
          onClick={() => navigate("/login")}
          mt={"0.5rem"} 
          bg="cyan.600" 
          color="white" 
          _hover={{ bg: "cyan.700" }}
          w={"100%"}
        >
          Continue
        </Button>
      </VStack>
    </Container>
    );
};

export default VerifyEmailPage;
