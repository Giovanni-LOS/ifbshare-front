import { Button, Container, Flex, Heading, HStack, Image, Input, SimpleGrid, VStack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field"
import { useEffect, useState } from "react";
import { useUserProfileStore } from "@/store/user";
import { toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";

const ProfilePage = () => {
    const [user, setUser] = useState({
        nickname: "",
        degree: "",
        email: "",
        password:"",
        confirmPassword:"",
        picture: ""
    });
    const { getUserProfile } = useUserProfileStore();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const { success, message, data: userFetched } = await getUserProfile();
            if(!success) {
                toaster.create({ description: message, title: 'Error', type: "error" });
            } else {
                setUser({...user, ...userFetched});
            }
        };
        fetchUserProfile();
    }, []);

    function handleUpdateUser(e: React.FormEvent) {
        e.preventDefault();

        
    }


    return (
        <Container background={"#ffffff"} >
            <Heading>Meu Perfil</Heading>

            <hr/>

            <Flex mt={5}  justifyContent={"space-between"} alignItems={"flex-start"}>
                <VStack justifyContent={"flex-start"}>
                    <Image
                        src={user.picture}
                        alt={"user profile picture"}
                        rounded={"full"}
                        objectFit={"contain"}
                    />
                    <Button 
                        mt={"0.5rem"} 
                        bg="cyan.600" 
                        color="white" 
                        size="lg"
                        w="full"
                        _hover={{ bg: "cyan.700" }}
                    >
                        Choose File
                    </Button>
                </VStack>
                <HStack>
                    <SimpleGrid columns={2} gap="30px">
                        <Field label="Nickname" required>
                            <Input
                                color={"black"}
                                size="sm"
                                px={".5rem"}
                                py={".125rem"}
                                fontSize="sm"
                                bg="white"
                                placeholder="Enter a nickname"
                                name="nickname"
                                value={user.nickname}
                                onChange={(e) => setUser({ ...user, nickname: e.target.value })}
                            />
                        </Field>
                        <Field label="Degree" required>
                            <Input
                                color={"black"}
                                size="sm"
                                px={".5rem"}
                                py={".125rem"}
                                fontSize="sm"
                                bg="white"
                                placeholder="Enter your degree"
                                name="degree"
                                value={user.degree}
                                onChange={(e) => setUser({ ...user, degree: e.target.value })}
                            />
                        </Field>

                        <Field label="Email" required>
                            <Input
                                color={"black"}
                                size="sm"
                                px={".5rem"}
                                py={".125rem"}
                                fontSize="sm"
                                bg="white"
                                placeholder="Enter your email"
                                name="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                            />
                        </Field>

                        <Field label="Password" required>
                            <Input
                                color={"black"}
                                size="sm"
                                px={".5rem"}
                                py={".125rem"}
                                fontSize="sm"
                                bg="white"
                                placeholder="Enter your password"
                                name="password"
                                type="password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                            />
                        </Field>

                        <Field label="Confirm Password" required>
                            <Input
                                color={"black"}
                                size="sm"
                                px={".5rem"}
                                py={".125rem"}
                                fontSize="sm"
                                bg="white"
                                placeholder="Confirm your password"
                                name="confirmPassword"
                                type="password"
                                value={user.confirmPassword}
                                onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                            />
                        </Field>
                    </SimpleGrid>
                </HStack>
                 <VStack
                    alignItems={"flex-end"}
                    justifyContent={"space-between"}
                >
                    <Button 
                    mt={"0.5rem"} 
                    bg="red.600" 
                    color="white" 
                    size="lg"
                    w="full"
                    _hover={{ bg: "red.700" }}
                    >
                        Logout
                    </Button>
                    <HStack>
                        <Button 
                        mt={"0.5rem"} 
                        bg="red.600" 
                        color="white" 
                        size="lg"
                        w="full"
                        _hover={{ bg: "red.700" }}
                        type="reset"
                        >
                            Cancel
                        </Button>
                        <Button 
                            mt={"0.5rem"} 
                            bg="cyan.600" 
                            color="white" 
                            size="lg"
                            w="full"
                            _hover={{ bg: "cyan.700" }}
                            type="submit"
                            >
                                Save
                        </Button>
                    </HStack>
                </VStack>
            </Flex>
        </Container>
    );
}

export default ProfilePage;