import { Box, Button, Container, Flex, Heading, HStack, Image, Input, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field"
import { useEffect, useState } from "react";
import { UpdateUserProfile, useUserProfileStore } from "@/store/user";
import { toaster } from "@/components/ui/toaster";
import { globalRouter } from "@/utils/globalRouter";
import { useAuthStore } from "@/store/auth";
import CreatePostButton from "@/components/CreatePostButton";
import PostRow from "@/components/PostRow";
import { Post } from "@/store/post";
import defaultPicture from "@/assets/default-user-picture.png";
import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,
} from "@/components/ui/menu";
import { IoMdArrowDropdown } from "react-icons/io";

const ProfilePage = () => {
    const { getUserProfile, updateUserProfile, user, getUserPostsById, loggedIn } = useUserProfileStore();
    const [UpdatedUser, setUpdatedUser] = useState<UpdateUserProfile>({
        nickname: user.nickname,
        degree: user.degree,
        picture: user.picture
    });
    const [urlPicture, setUrlPicture] = useState(defaultPicture);
    const { logout, requestPassword } = useAuthStore();
    const [userPosts, setUserPosts] = useState<Post[]>();
    const degrees = ['Física', 'Computação'];


    useEffect(() => {
        setUpdatedUser({
            nickname: user.nickname,
            degree: user.degree,
            picture: undefined
        });
    }, [user]);

    useEffect(() => {
        const fetchPosts = async () => {
            const { success, message, data: postsFetched } = await getUserPostsById(user._id);
            if(!success) {
                toaster.create({ description: message, title: 'Error', type: "error" });
            } else {
                setUserPosts(postsFetched);
            }
        };
        if (loggedIn) {
            fetchPosts();
        }
    },[user]);

    useEffect(() => {
        if (user.picture) {
            setUrlPicture(`data:${user.picture.type};base64,${user.picture.data}`);            
        }
    }, [user.picture]);


    async function handleUpdateUser() {
        const { success, message, data: userUpdated } = await updateUserProfile(UpdatedUser);
        if (!success) {
            toaster.create({ description: message, title: 'Error', type: "error" });
        } else {
            setUpdatedUser({ ...UpdatedUser, ...userUpdated });
            toaster.create({ description: message, title: 'Success', type: "success" });
        }

    }

    async function handleLogoutUser() {
        const { success, message } = await logout();
        if (!success) {
            toaster.create({ description: message, title: 'Error', type: "error" });
        } else {
            toaster.create({ description: message, title: 'Success', type: "success" });
            globalRouter.navigate?.("/login");
        }
    }

    const handleRequestPassword = async () => {
        const { success, message } = await requestPassword(user);
        if (!success) {
            toaster.create({ description: message, title: 'Error', type: "error" });
        } else {
            toaster.create({ description: message, title: 'Success', type: "success" });
        }
    }

    const handleUploadPicture = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setUpdatedUser({ ...UpdatedUser, picture: file });
            setUrlPicture(URL.createObjectURL(file));
        }
    }

    return (
        <Container background={"var(--white-500)"} color="black" borderRadius={4} px={10} py={10} mt={10} minH={"100vh"}>
            <Heading size={"4xl"} fontSize={"3xl"}>Meu Perfil</Heading>
            <hr />
            <Flex mt={10} mb={10} justifyContent={"space-evenly"} alignItems={"center"} flexWrap="wrap" gap="20px" position="relative">
                <Button
                    position="absolute"
                    top={0}
                    right={0}
                    bg="red.600"
                    color="white"
                    _hover={{ bg: "red.700" }}
                    w="fit-content"
                    p={5}
                    onClick={handleLogoutUser}
                >
                    Logout
                </Button>
                <VStack justifyContent={"flex-start"}>
                    <Image
                        src={urlPicture}
                        alt={"user profile picture"}
                        rounded={"full"}
                        boxSize="150px"
                        objectFit="cover"
                    />
                    <Button
                        mt={"1rem"}
                        bg="cyan.600"
                        color="white"
                        size="xl"
                        w="full"
                        _hover={{ bg: "cyan.700" }}
                        onClick={() => { document.getElementById('fileInput')?.click(); }}
                    >
                        Choose File
                    </Button>
                    <Input
                        id="fileInput"
                        type="file"
                        display={"none"}
                        onChange={handleUploadPicture}
                    />
                </VStack>
                <SimpleGrid columns={2} gap="20px">
                    <Field label="Nickname" required>
                        <Input
                            color={"black"}
                            size="md"
                            px={".75rem"}
                            py={".25rem"}
                            fontSize="md"
                            bg="#f5f1e3"
                            border="1px solid black"
                            placeholder="Enter a nickname"
                            name="nickname"
                            value={UpdatedUser.nickname}
                            onChange={(e) => setUpdatedUser({ ...UpdatedUser, nickname: e.target.value })}
                            width="100%" />
                    </Field>
                    <Field label="Degree">
                        <MenuRoot onSelect={(value) => setUpdatedUser({ ...UpdatedUser, degree: value.value })}>
                            <MenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="md"
                                    bg="#f5f1e3"
                                    border="1px solid black"
                                    width="100%"
                                    justifyContent="space-between"
                                    px={1}
                                    mt={0}
                                >
                                    <Text>{UpdatedUser.degree || 'Select Degree'}</Text>
                                    <IoMdArrowDropdown />
                                </Button>
                            </MenuTrigger>
                            <MenuContent>
                                {degrees.map((degree) => (
                                    <MenuItem key={degree} value={degree} textAlign="center">
                                        {degree}
                                    </MenuItem>
                                ))}
                            </MenuContent>
                        </MenuRoot>         
                    </Field>

                    <Field label="Email" required>
                        <Input
                            color={"black"}
                            size="md"
                            px={".75rem"}
                            py={".25rem"}
                            fontSize="md"
                            bg="#f5f1e3"
                            border="1px solid black"
                            placeholder="Enter your email"
                            name="email"
                            value={user.email}
                            readOnly
                            width="100%" />
                    </Field>
                    <Box w="full">
                        <Field label="Password" required>
                            <Button 
                                onClick={handleRequestPassword} 
                                bg="cyan.600" 
                                color="white" 
                                _hover={{ bg: "cyan.700" }}
                                w={"full"}
                            >
                                Reset Password
                            </Button>
                        </Field>
                    </Box>
                </SimpleGrid>
                <Button
                    bg="cyan.600"
                    color="white"
                    size="lg"
                    _hover={{ bg: "cyan.700" }}
                    type="submit"
                    p={5}
                    onClick={handleUpdateUser}
                    position="absolute"
                    bottom={-15}
                    right={0}
                >
                    Save
                </Button>
            </Flex>
            <Heading size={"4xl"} fontSize={"3xl"}>Posts</Heading>
            <hr />
            <HStack justifyContent={"flex-end"} alignItems={"center"} flexWrap="wrap" gap={2} mt={5} mb={0}>
                <Text
                    color="black"
                    fontSize={"md"}
                >
                    Novo Post
                </Text>
                <CreatePostButton _redirect="/profile" />
            </HStack>
            <Flex mt={5} flexDirection="column" gap={4}>
                {userPosts && userPosts.map((post) => (
                    <PostRow 
                    key={post._id} 
                    post={post} 
                    editable={true} 
                    _redirect="/profile" 
                    onRemove={(id) => { setUserPosts(userPosts.filter((p) => p._id !== id)) }} />
                ))}
            </Flex>
        </Container>
    );
}

export default ProfilePage;