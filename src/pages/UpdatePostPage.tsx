import { Button, Container, Heading, HStack, Input, VStack, SimpleGrid, Text } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useEffect, useState } from "react";
import { PostUpdated, usePostStore } from "@/store/post";
import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,
} from "@/components/ui/menu";
import {
    FileUploadDropzone,
    FileUploadRoot,
} from "@/components/ui/file-upload";
import { toaster } from "@/components/ui/toaster";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import UploadList from "@/components/UploadList";
import { FileCustomMetaData, useFileStore } from "@/store/file";

const UpdatePostPage = () => {
    const { updatePost, getPostById } = usePostStore();
    const [updatedPost, setUpdatedPost] = useState<PostUpdated>({
        _id: "",
        title: "",
        content: "",
        files: [],
        tags: [],
    });
    const [filesFetched, setFilesFetched] = useState<FileCustomMetaData[]>([]);
    const [filesDeleted, setFilesDeleted] = useState<string[]>([]);
    const [selectedItems, setSelectedItems] = useState<{ semester?: string, course?: string, year?: string }>({});
    const { id } = useParams();
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const { getFilesMetaData, postFile, deleteFile } = useFileStore();

    const onClose = () => {
        const redirect = params.get("_redirect") || "/";
        navigate(redirect, { replace: true });
    };

    useEffect(() => {
        const fetchPost = async () => {
            if (id) {
                const { success, message, data } = await getPostById(id);
                if (!success) {
                    toaster.create({ description: message, title: 'Error', type: "error" });
                } else {
                    setUpdatedPost(data);

                    if(data.tags){
                        setSelectedItems({
                            semester: data.tags.find((tag: string) => tag.includes('Semestre')) || '',
                            course: data.tags.find((tag: string) => courses.includes(tag)) || '',
                            year: data.tags.find((tag: string) => tag.length === 4) || '',
                        });
                    }
                }
            }
        };
        fetchPost();
    }, [id]);

    useEffect(() => {
        const handleLoadFiles = async () => {
            if (id) {
                const { success, data: files } = await getFilesMetaData(id);
                if (!success) {
                    toaster.create({ description: "Failed to fetch files", title: "Error", type: "error" });
                } else {
                    setFilesFetched(files);
                }
            }
        };
        handleLoadFiles();
    }, [id]);

    const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
    const years = Array.from({ length: new Date().getFullYear() - 2016 }, (_, index) => 2017 + index);
    const courses = ['Física', 'Computação'];

    async function handleUpdatePost() {
        const tags = Object.values(selectedItems) as string[];

        const { success, message } = await updatePost({
            _id: updatedPost._id,
            title: updatedPost.title,
            content: updatedPost.content,
            tags
        });
        
        if (!success) {
            toaster.create({ description: message, title: 'Error', type: "error" });
        } else {
            toaster.create({ description: message, title: 'Success', type: "success" });
        }
    }

    const handleFileUpload = async () => {
        if(!updatedPost.files) return;

        const { success, message } = await postFile(updatedPost._id, updatedPost.files);

        if (!success) {
            toaster.create({ description: message, title: 'Error', type: "error" });
        }
    };

    const handleFileDelete = async () => {
        if(!filesDeleted) return;
        let allStatus = {
            success: true,
            message: "",
        };

        filesDeleted.forEach(async (fileId) => {
             const { success, message } = await deleteFile(updatedPost._id, fileId);
             if(!success) {
                allStatus.success = success;
                allStatus.message = message;
             }
        });
        if(!allStatus.success) {
            toaster.create({ description: allStatus.message, title: 'Error', type: "error" });
        }
    };

    function handleSelectedItem(type: string, value: { value: string }) {
        setSelectedItems({ ...selectedItems, [type]: value.value });
    }
    
    function handleFileAccepted(details: any) {
        const files = [details.files[details.files.length - 1]].concat(updatedPost.files || []);
        setUpdatedPost({...updatedPost, files });
    }

    return (
        <Container background={"var(--white-500)"} color="black" borderRadius={4} px={10} py={5} mt={10} h={"100vh"} position="relative" >
            <Heading fontSize={"4xl"} size={"4xl"}>Atualizar Post</Heading>
            <hr />
            <SimpleGrid columns={3} spaceX={10} mt={"14"}>
                <VStack spaceY={5}>
                    <FileUploadRoot maxW="xl" alignItems="stretch" maxFiles={10} onFileAccept={handleFileAccepted}>
                        <FileUploadDropzone
                            label="Drag and drop here to upload"
                            description=".png, .jpg up to 5MB"
                            background={"transparent"}
                            border="2px dashed black"
                        />
                        {updatedPost.files && <><Heading fontSize={"2xl"} size={"2xl"}>Novos Arquivos</Heading>
                        <hr />

                        <UploadList
                            files={updatedPost.files}
                            onRemoveFile={(file) => { setUpdatedPost({ ...updatedPost, files: (updatedPost.files || []).filter(f => f !== file) }) }}
                        /></>}

                        {filesFetched.length !== 0 && <><Heading fontSize={"2xl"} size={"2xl"}>Arquivos Anteriores</Heading>
                        <hr />

                        <UploadList
                            files={filesFetched}
                            onRemoveFile={(file) => { 
                                setFilesFetched((filesFetched || []).filter(f => f !== file));
                                setFilesDeleted([...filesDeleted, file._id])
                            }}
                        /></>}
                    </FileUploadRoot>
                </VStack>
                <VStack spaceY={5}>
                    <Field label="Title" required>
                        <Input
                            color={"black"}
                            size="md"
                            px={".75rem"}
                            py={".25rem"}
                            fontSize="md"
                            bg="#f5f1e3"
                            border="1px solid black"
                            placeholder="Title"
                            name="title"
                            type="text"
                            value={updatedPost.title}
                            onChange={(e) => setUpdatedPost({ ...updatedPost, title: e.target.value })}
                            width="100%"
                        />
                    </Field>
                    <Field label="Content">
                        <Input
                            color={"black"}
                            size="md"
                            px={".75rem"}
                            py={".25rem"}
                            fontSize="md"
                            bg="#f5f1e3"
                            border="1px solid black"
                            placeholder="Content"
                            name="content"
                            type="text"
                            value={updatedPost.content}
                            onChange={(e) => setUpdatedPost({ ...updatedPost, content: e.target.value })}
                            width="100%"
                        />
                    </Field>
                </VStack>
                <VStack spaceY={5} alignItems="center">
                    <MenuRoot onSelect={(value) => { handleSelectedItem('course', value) }} >
                        <MenuTrigger asChild>
                            <Button variant="outline" size="md" bg="#f5f1e3" border="1px solid black" minW="60%" justifyContent="space-between" px={1} mt={0}>
                                <Text>{selectedItems?.course ? selectedItems.course : 'Curso'}</Text>
                                <IoMdArrowDropdown />
                            </Button>
                        </MenuTrigger>
                        <MenuContent>
                            {courses.map(course => (
                                <MenuItem key={`course-${course}`} value={`${course}`} textAlign="center">
                                    {course}
                                </MenuItem>
                            ))}
                        </MenuContent>
                    </MenuRoot>
                    <MenuRoot onSelect={(value) => { handleSelectedItem('semester', value) }}>
                        <MenuTrigger asChild>
                            <Button variant="outline" size="md" bg="#f5f1e3" border="1px solid black" minW="60%" justifyContent="space-between" px={1}>
                                {selectedItems?.semester ? selectedItems.semester : 'Semestre'}
                                <IoMdArrowDropdown />
                            </Button>
                        </MenuTrigger>
                        <MenuContent>
                            {semesters.map(semester => (
                                <MenuItem key={`sem-${semester}`} value={`Semestre ${semester}`} textAlign="center">
                                    Semestre {semester}
                                </MenuItem>
                            ))}
                        </MenuContent>
                    </MenuRoot>
                    <MenuRoot onSelect={(value) => { handleSelectedItem('year', value) }}>
                        <MenuTrigger asChild>
                            <Button variant="outline" size="md" bg="#f5f1e3" border="1px solid black" minW="60%" justifyContent="space-between" px={1}>
                                {selectedItems?.year ? selectedItems.year : 'Ano'}
                                <IoMdArrowDropdown />
                            </Button>
                        </MenuTrigger>
                        <MenuContent>
                            {years.map(year => (
                                <MenuItem key={`year-${year}`} value={`${year}`} textAlign="center">
                                    {year}
                                </MenuItem>
                            ))}   
                        </MenuContent>
                    </MenuRoot>
                </VStack>
            </SimpleGrid>
            <HStack margin={"auto"} mt={10} justifyContent="center" spaceX={4}>
                <Button 
                    bg="red.600" 
                    color="white" 
                    size="lg"
                    _hover={{ bg: "red.700" }}
                    type="reset"
                    onClick={onClose}
                    px={8}
                >
                    Cancel
                </Button>
                <Button 
                    bg="cyan.600"
                    color="white"
                    size="lg"
                    _hover={{ bg: "cyan.700" }}
                    type="submit"
                    px={8}
                    onClick={() => {
                        handleUpdatePost();
                        handleFileUpload();
                        handleFileDelete();
                        onClose();
                    }}
                >
                    Save
                </Button>
            </HStack>
        </Container>
    );
}

export default UpdatePostPage;