import { FileCustom, FileCustomMetaData, useFileStore } from "@/store/file";
import { Post } from "@/store/post";
import { useUserProfileStore } from "@/store/user";
import { dateDistanceToToday } from "@/utils/dateFormatter";
import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
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

const PostRow = ({ post, editable=false, _redirect }: PostRowProps) => {
    const [author, setAuthor] = useState("");
    const [filesMetaData, setFilesMetaData] = useState<FileCustomMetaData[]>([]);
    const { getUserById, user } = useUserProfileStore();
    const { getFilesMetaData, downloadFile } = useFileStore();
    const navigate = useNavigate();

    async function handleDownloadFiles(file: FileCustomMetaData, e: React.MouseEvent) {
        e.stopPropagation();
        const { success, message, data } = await downloadFile(file._id);
        if(!success || !data) {
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

    async function handleLoadFiles(e: React.MouseEvent) {
        e.stopPropagation();
        const { success, data: files } = await getFilesMetaData(post._id);
        if(!success) {
            toaster.create({ description: "Failed to fetch files", title: 'Error', type: "error" });
        } else {
            setFilesMetaData(files);
            files.forEach((file) => {
                handleDownloadFiles(file, e);
            });
        }
    }
    async function handleDeletePost(e: React.MouseEvent) {
        e.stopPropagation();
        // Implement delete post
    }
    async function handleEditPost(e: React.MouseEvent) {
        e.stopPropagation();
        navigate(`/update-post/${post._id}?_redirect=${_redirect || ''}`, { replace: true });
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
            <Box p={6} flex={1} bg="#dddbcb" rounded={"md"} position="relative" onClick={() => navigate(`/post/${post._id}`)} cursor="pointer">
                <Text fontSize="md" color="black">{post.title}</Text>
                <Button position="absolute" right={0} top={0} size={"sm"} margin={0} padding={0} bg="transparent" _hover={{ bg: "transparent" }} onClick={(e) => handleLoadFiles(e)}>
                    <IoMdDownload color="var(--mint-green)" size={20}/>
                </Button>
                {editable && (
                    <>
                        <Button position="absolute" right={6} top={0} size={"sm"} margin={0} padding={0} bg="transparent" _hover={{ bg: "transparent" }} onClick={(e) => handleDeletePost(e)}>
                            <FaRegTrashCan color="#333333" size={20}/>
                        </Button>
                        <Button position="absolute" right={12} top={0} size={"sm"} margin={0} padding={0} bg="transparent" _hover={{ bg: "transparent" }} onClick={(e) => handleEditPost(e)}>
                            <BiSolidEdit color="#333333" size={20}/>
                        </Button>
                    </>
                )}
            </Box>
            <Box p={6} bg="#dddbcb" rounded={"md"} width="15%">
                <Text fontSize="md" color="black">{ author || "???" }</Text>
            </Box>
            <Box p={6} bg="#dddbcb" rounded={"md"} width="15%">
                <Text fontSize="md" color="black">{dateDistanceToToday(post.createdAt) + " dias atrás"}</Text>
            </Box>
        </Flex>
    );
}

export default PostRow;