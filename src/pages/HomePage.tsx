import { Container, Flex, Heading, Text, Toast } from "@chakra-ui/react";
import { Post, usePostStore } from "@/store/post";
import { useEffect, useState } from "react";
import PostRow from "@/components/PostRow";
import { toaster } from "@/components/ui/toaster";


const HomePage = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const { getPosts } = usePostStore();

    useEffect(() => {
        const fetchPosts = async () => {
            const { success, message, data: postsFetched } = await getPosts();
            if(!success) {
                toaster.create({ description: message, title: 'Error', type: "error" });
            } else {
                setPosts(postsFetched);
            }
        };
        fetchPosts();
    }, []);

    return (
        <Container background={"var(--white-500)"} color="black" borderRadius={4} px={10} py={5} mt={10} minH={"100vh"} position="relative">
            <Flex bg={"whiteAlpha.500"} justify="center" gap={8} borderRadius={4} position="absolute" top={0} left={0} width="100%" align={"center"} px={10}>
                <Text flex={1} fontSize={"xl"}>Nome</Text>
                <Text fontSize={"xl"} width={"13%"}>Uploader</Text>
                <Text fontSize={"xl"} width={"15%"}>Lançado há</Text>
            </Flex>
            <Flex mt={10} flexDirection="column" gap={4}>
                {posts.map((post) => (
                    <PostRow key={post._id} post={post} />
                ))}
            </Flex>
        </Container>
    );
};

export default HomePage;