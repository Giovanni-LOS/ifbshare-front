import { dateDistanceToToday } from "@/utils/dateFormatter";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoMdDownload } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";
import { BiSolidEdit } from "react-icons/bi";
import { Link } from "react-router-dom"; // Importa o Link para navegação interna

interface Post {
  _id: string;
  title: string;
  author: string;
  createdAt: string;
}

interface FileCustomMetaData {
  _id: string;
  name: string;
}

interface PostRowProps {
  post: Post;
}

const PostRow = ({ post }: PostRowProps) => {
  // Simulando um autor fictício (anteriormente puxado da API)
  const [author, setAuthor] = useState("Usuário Fictício");

  // Simulando um conjunto fixo de arquivos (antes baixado da API)
  const filesMetaData: FileCustomMetaData[] = [
    { _id: "1", name: "arquivo1.pdf" },
    { _id: "2", name: "arquivo2.png" },
  ];

  function handleDownloadFiles(file: FileCustomMetaData) {
    const fakeBlob = new Blob(["Conteúdo fictício"], { type: "text/plain" });
    const url = window.URL.createObjectURL(fakeBlob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", file.name);
    document.body.appendChild(link);
    link.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  }

  function handleLoadFiles(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.preventDefault();
    filesMetaData.forEach((file) => handleDownloadFiles(file));
  }

  function handleDeletePost(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.preventDefault();
    alert("Post deletado (simulação)");
  }

  function handleEditPost(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.preventDefault();
    alert("Edição de post (simulação)");
  }

  return (
    <Flex gap={2} justify="center">
      <Link
        to={`/post/${post._id}`}
        style={{ textDecoration: "none", flex: 1 }}
      >
        <Box
          p={6}
          flex={1}
          bg="#dddbcb"
          rounded={"md"}
          position="relative"
          cursor="pointer"
          _hover={{ bg: "gray.200" }}
        >
          <Text fontSize="md" color="black">
            {post.title}
          </Text>
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
        </Box>
      </Link>
      <Box p={6} bg="#dddbcb" rounded={"md"}>
        <Text fontSize="md" color="black">
          {author}
        </Text>
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
