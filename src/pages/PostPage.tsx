import React, { useEffect, useState } from 'react';
import {Box, Text, VStack, HStack, Button, Spinner, Container} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {useUserProfileStore} from "@/store/user.ts";
import {FileCustomMetaData, useFileStore} from "@/store/file.ts";
import {toaster} from "@/components/ui/toaster";

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
                const postResponse = await axios.get(`/api/posts/${id}`);
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
        <Container p={4} minH="100vh">
            <Box
                bg="var(--white-500)"
                color={"var(--black)"}
                borderRadius="md"
                boxShadow="md"
                p={4}
                mb={6}
            >
                <HStack justify="space-between" mb={4}>
                    <Text fontWeight="bold">{authorName || "Carregando autor..."}</Text>
                    <Text fontSize="sm" color="gray.500">
                        {new Date(post.createdAt).toLocaleDateString()}
                    </Text>
                </HStack>

                <VStack align="start">
                    <Text fontWeight="bold" fontSize="xl">
                        {post.title}
                    </Text>
                    <Text>{post.content}</Text>
                </VStack>

                <HStack mt={4}>
                    <Button colorScheme="teal" onClick={handleLoadFiles}>Baixar</Button>
                </HStack>
            </Box>
        </Container>
    );
};

export default PostPage;