import { Button, Container, Heading, HStack, Input, VStack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field"
import { useEffect, useState } from "react";
import { Post, PostCreated } from "@/store/post";

interface CreatePostPageProps {
    post?: Post;
    onClose: () => void;
}

const CreatePostPage = ({ post, onClose }: CreatePostPageProps) => {
    const [newPost, setNewPost] = useState<PostCreated>({
        title: "",
        content: "",
        tags: [],
        files: []
    });

    useEffect(() => { 
        if(post) {
            setNewPost({
                title: post.title,
                content: post.content,
                tags: post.tags,
            });
        }
    }, []);


    return (
        <Container background={"var(--white-500)"} color="black" borderRadius={4} px={10} py={5} mt={10} h={"100vh"} position="relative" >
            <Heading fontSize={"4xl"} size={"4xl"}>Criar Post</Heading>

            <hr/>

            <HStack mt={5}>
                <VStack>
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
                <VStack>
                    <Field
                        label="Title"
                        required
                    >
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
                            value={newPost.title}
                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                            width="100%"
                        />
                    </Field>

                    <Field
                        label="Content"
                        required
                    >
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
                            value={newPost.content}
                            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                            width="100%"
                        />
                    </Field>
                </VStack>
            </HStack>
            <HStack justifySelf={"Center"}>
                <Button 
                mt={"0.5rem"} 
                bg="red.600" 
                color="white" 
                size="lg"
                _hover={{ bg: "red.700" }}
                type="reset"
                >
                    Cancel
                </Button>
                <Button 
b                   g="cyan.600"
                    color="white"
                    size="lg"
                    _hover={{ bg: "cyan.700" }}
                    type="submit"
                    p={5}
                    >
                        Save
                </Button>
            </HStack>
        </Container>
    );
}

export default CreatePostPage;