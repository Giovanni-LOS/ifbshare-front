import { Container, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PostRow from "@/components/PostRow";

interface Post {
  _id: string;
  title: string;
  uploader: string;
  createdAt: string;
}

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Simulando posts locais sem backend
    const fakePosts: Post[] = [
      {
        _id: "1",
        title: "Post 1",
        uploader: "Usuário A",
        createdAt: "2024-02-05",
      },
      {
        _id: "2",
        title: "Post 2",
        uploader: "Usuário B",
        createdAt: "2024-02-04",
      },
      {
        _id: "3",
        title: "Post 3",
        uploader: "Usuário C",
        createdAt: "2024-02-03",
      },
    ];
    setPosts(fakePosts);
  }, []);

  return (
    <Container
      background="var(--white-500)"
      color="black"
      borderRadius={4}
      px={10}
      py={5}
      mt={10}
      h="100vh"
      position="relative"
    >
      {/* Cabeçalho */}
      <Flex
        bg="whiteAlpha.500"
        justify="center"
        gap={8}
        borderRadius={4}
        position="absolute"
        top={0}
        left={0}
        width="100%"
        align="center"
        px={10}
        py={2}
      >
        <Text flex={1} fontSize="xl">
          Nome
        </Text>
        <Text fontSize="xl">Uploader</Text>
        <Text fontSize="xl">Lançado há</Text>
      </Flex>

      {/* Lista de Posts */}
      <Flex mt={16} flexDirection="column" gap={4}>
        {posts.map((post) => (
          <PostRow key={post._id} post={post} />
        ))}
      </Flex>
    </Container>
  );
};

export default HomePage;
