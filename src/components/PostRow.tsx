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
import { Link } from "react-router-dom"; // Importa o Link para navegação interna

interface PostRowProps {
    post: Post;
}

const PostRow = ({ post }: PostRowProps) => {
    const [author, setAuthor] = useState("");
    const [filesMetaData, setFilesMetaData] = useState<FileCustomMetaData[]>([]);
    const { getUserById, user } = useUserProfileStore();
    const { getFilesMetaData, downloadFile } = useFileStore();

    async function handleDownloadFiles(file: FileCustomMetaData) {
        const { success, message, data } = await downloadFile(file._id);
        if (!success || !data) {
            toaster.create({ description: message, title: 'Error', type: "error" });
            return;
        }

        const url = window.URL.createObjectURL(data);

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

    async function handleDeletePost(e: React.MouseEvent<HTMLButtonElement>) {
        // Implement delete post
        e.stopPropagation();
        e.preventDefault();
    }

    async function handleEditPost(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        e.preventDefault();
        // Implement edit post
    }

    useEffect(() => {
        const fetchAuthor = async () => {
            const { data } = await getUserById(post.author);
            setAuthor(data.nickname);
        };
        fetchAuthor();
    }, []);

    return (
        <Flex gap={2} justify="center">
            <Link to={`/post/${post._id}`} style={{ textDecoration: "none", flex: 1,}}>
                <Box
                    p={6}
                    flex={1}
                    bg="#dddbcb"
                    rounded={"md"}
                    position="relative"
                    cursor="pointer"
                    _hover={{ bg: "gray.200" }}
                >
                    <Text fontSize="md" color="black">{post.title}</Text>
                    <Button
                        position="absolute"
                        right={0}
                        top={0}
                        size={"sm"}
                        margin={0}
                        padding={0}
                        bg="transparent"
                        _hover={{ bg: "transparent" }}
                        onClick={handleLoadFiles}
                    >
                        <IoMdDownload color="var(--mint-green)" size={20} />
                    </Button>
                    {user.nickname === author && (
                        <>
                            <Button
                                position="absolute"
                                right={6}
                                top={0}
                                size={"sm"}
                                margin={0}
                                padding={0}
                                bg="transparent"
                                _hover={{ bg: "transparent" }}
                                onClick={handleDeletePost}
                            >
                                <FaRegTrashCan color="#333333" size={20} />
                            </Button>
                            <Button
                                position="absolute"
                                right={12}
                                top={0}
                                size={"sm"}
                                margin={0}
                                padding={0}
                                bg="transparent"
                                _hover={{ bg: "transparent" }}
                                onClick={handleEditPost}
                            >
                                <BiSolidEdit color="#333333" size={20} />
                            </Button>
                        </>
                    )}
                </Box>
            </Link>
            <Box p={6} bg="#dddbcb" rounded={"md"}>
                <Text fontSize="md" color="black">{author || "???"}</Text>
            </Box>
            <Box p={6} bg="#dddbcb" rounded={"md"}>
                <Text fontSize="md" color="black">
                    {dateDistanceToToday(post.createdAt) + " dias atrás"}
                </Text>
            </Box>
        </Flex>
    );
};

export default PostRow;
