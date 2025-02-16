import axios from "axios";
import { FileCustomMetaData, useFileStore } from "@/store/file";
import { Post } from "@/store/post";
import { useUserProfileStore } from "@/store/user";
import { dateDistanceToToday } from "@/utils/dateFormatter";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toaster } from "./ui/toaster";
import { IoMdDownload } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";
import { BiSolidEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

interface PostRowProps {
    post: Post;
    editable?: boolean;
    _redirect?: string;
}

const PostRow = ({ post, editable = false, _redirect }: PostRowProps) => {
    const [author, setAuthor] = useState("");
    const [filesMetaData, setFilesMetaData] = useState<FileCustomMetaData[]>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { getUserById } = useUserProfileStore();
    const { getFilesMetaData, downloadFile } = useFileStore();
    const navigate = useNavigate();

    async function handleDownloadFiles(file: FileCustomMetaData, e: React.MouseEvent) {
        e.stopPropagation();
        const { success, message, data } = await downloadFile(file._id);
        if (!success || !data) {
            toaster.create({ description: message, title: "Error", type: "error" });
            return;
        }

        const url = window.URL.createObjectURL(data);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", file.name);
        document.body.appendChild(link);
        link.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
    }

    async function handleLoadFiles(e: React.MouseEvent) {
        e.stopPropagation();
        const { success, data: files } = await getFilesMetaData(post._id);
        if (!success) {
            toaster.create({ description: "Failed to fetch files", title: "Error", type: "error" });
        } else {
            setFilesMetaData(files);
            files.forEach((file) => handleDownloadFiles(file, e));
        }
    }

    function handleDeletePost(e: React.MouseEvent) {
        e.stopPropagation();
        setIsDeleteModalOpen(true);
    }

    async function handleConfirmDelete() {
        try {
            const response = await axios.delete(`/api/posts/${post._id}`);
            toaster.create({ description: "Post deleted successfully", title: "Success", type: "success" });
            setIsDeleteModalOpen(false);
            window.location.reload();
        } catch (error) {
            const message = error.response?.data?.message || "Failed to delete post";
            toaster.create({ description: message, title: "Error", type: "error" });
        }
    }

    useEffect(() => {
        const fetchAuthor = async () => {
            const { data } = await getUserById(post.author);
            setAuthor(data.nickname);
        };
        fetchAuthor();
    }, []);

    return (
        <>
            {isDeleteModalOpen && (
                <Box position="fixed" top={0} left={0} width="100vw" height="100vh" backgroundColor="rgba(0,0,0,0.5)" display="flex" justifyContent="center" alignItems="center" zIndex={1000}>
                    <Box bg="white" p={6} rounded="md" textAlign="center" boxShadow="lg">
                        <Text fontSize="lg" mb={4}>Tem certeza que deseja excluir este post?</Text>
                        <Flex justifyContent="center" gap={4}>
                            <Button colorScheme="red" onClick={handleConfirmDelete} _hover={{ bg: "red.600", transform: "scale(1.05)" }} _active={{ bg: "red.700" }} transition="all 0.2s ease-in-out" borderRadius="full" px={6} py={2} fontWeight="bold" shadow="md">
                                Sim, Excluir
                            </Button>
                            <Button onClick={() => setIsDeleteModalOpen(false)} bg="gray.200" _hover={{ bg: "gray.300", transform: "scale(1.05)" }} _active={{ bg: "gray.400" }} transition="all 0.2s ease-in-out" borderRadius="full" px={6} py={2} fontWeight="bold" shadow="md">
                                Cancelar
                            </Button>
                        </Flex>
                    </Box>
                </Box>
            )}
            <Flex gap={2} justify="center">
                <Box p={6} flex={1} bg="#dddbcb" rounded={"md"} position="relative" onClick={() => navigate(`/post/${post._id}`)} cursor="pointer">
                    <Text fontSize="md" color="black">{post.title}</Text>
                    <Button position="absolute" right={0} top={0} size={"sm"} margin={0} padding={0} bg="transparent" _hover={{ bg: "transparent" }} onClick={(e) => handleLoadFiles(e)}>
                        <IoMdDownload color="var(--mint-green)" size={20} />
                    </Button>
                    {editable && (
                        <>
                            <Button position="absolute" right={6} top={0} size={"sm"} margin={0} padding={0} bg="transparent" _hover={{ bg: "transparent" }} onClick={handleDeletePost}>
                                <FaRegTrashCan color="#333333" size={20} />
                            </Button>
                            <Button position="absolute" right={12} top={0} size={"sm"} margin={0} padding={0} bg="transparent" _hover={{ bg: "transparent" }} onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/update-post/${post._id}?_redirect=${_redirect || ''}`, { replace: true });
                            }}>
                                <BiSolidEdit color="#333333" size={20} />
                            </Button>
                        </>
                    )}
                </Box>
                <Box p={6} bg="#dddbcb" rounded={"md"} width="15%">
                    <Text fontSize="md" color="black">{author || "???"}</Text>
                </Box>
                <Box p={6} bg="#dddbcb" rounded={"md"} width="15%">
                    <Text fontSize="md" color="black">{dateDistanceToToday(post.createdAt) + " dias atrás"}</Text>
                </Box>
            </Flex>
        </>
    );
};

export default PostRow;
