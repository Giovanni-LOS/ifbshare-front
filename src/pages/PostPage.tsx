import React, { useEffect, useState } from 'react';
import {Box, Text, VStack, HStack, Button, Spinner, Container, Flex} from '@chakra-ui/react';
import api from "@/utils/axios.ts";
import {useUserProfileStore} from "@/store/user.ts";
import {FileCustomMetaData, useFileStore} from "@/store/file.ts";
import {toaster} from "@/components/ui/toaster";
import {useParams} from "react-router-dom";

interface Post {
    _id: string;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    tags: string[];
}

const PostPage = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [authorName, setAuthorName] = useState<string | null>(null);
    const [filesMetaData, setFilesMetaData] = useState<FileCustomMetaData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { getUserById } = useUserProfileStore();
    const { getFilesMetaData, downloadFile } = useFileStore();

    async function handleDownloadFiles(file: FileCustomMetaData) {
        const { success, message, data: blob } = await downloadFile(file._id);
        if (!success || !blob) {
            toaster.create({ description: message, title: 'Error', type: "error" });
            return;
        }

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file.name);
        document.body.appendChild(link);
        link.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
    }

    async function handleLoadFiles(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        e.preventDefault();
        if (post) {
            const { success, data: files } = await getFilesMetaData(post._id);
            if (!success) {
                toaster.create({ description: "Failed to fetch files", title: 'Error', type: "error" });
            } else {
                setFilesMetaData(files);
                files.forEach((file) => {
                    handleDownloadFiles(file);
                });
            }
        }
    }

    useEffect(() => {
        const fetchPostAndAuthor = async () => {
            try {
                const postResponse = await api.get(`/api/posts/${id}`);
                const fetchedPost = postResponse.data.data as Post;
                setPost(fetchedPost);

                if (fetchedPost.author) {
                    const fetchAuthor = async () => {
                        const { data } = await getUserById(fetchedPost.author);
                        setAuthorName(data.nickname);
                    };
                    await fetchAuthor();
                }
            } catch (error) {
                console.error('Erro ao buscar o post ou autor:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPostAndAuthor();
        }
    }, [id]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
                <Spinner size="xl" />
            </Box>
        );
    }

    if (!post) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
                <Text fontSize="xl">Post não encontrado.</Text>
            </Box>
        );
    }

    return (
        <Container
            background="var(--white-500)"
            color="black"
            borderRadius={4}
            px={10}
            py={5}
            mt={10}
            minH="100vh"
            position="relative"
        >
            <Flex
                bg="whiteAlpha.500"
                justify="space-between"
                align="center"
                gap={8}
                borderRadius={4}
                position="absolute"
                top={0}
                left={0}
                width="100%"
                px={10}
                py={2}
            >
                <Text fontSize="xl" fontWeight="bold">
                    {authorName || "Carregando autor..."}
                </Text>
                <Text fontSize="md">{new Date(post.createdAt).toLocaleDateString()}</Text>
            </Flex>

            <Box
                bg="gray.300"
                borderRadius="md"
                boxShadow="md"
                p={6}
                mt={16} // Distância do cabeçalho
            >
                <VStack align="start">
                    <Text fontWeight="bold" fontSize="2xl">
                        {post.title}
                    </Text>
                    <Text fontSize="md">{post.content}</Text>
                </VStack>

                <Flex justify="flex-end" mt={6} gap={4}>
                    <Button
                        bg="#1CA7AF"
                        color="white"
                        borderRadius="4px"
                        px={8}
                        _hover={{ bg: "#178C94" }} // Efeito de hover sutil
                        _active={{ bg: "#126D72" }} // Cor quando clicado
                        onClick={handleLoadFiles}
                    >
                        Baixar
                    </Button>


                </Flex>
            </Box>
        </Container>
    );
};

export default PostPage;