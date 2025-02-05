import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  SimpleGrid,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useEffect, useState } from "react";
import { UserProfile, useUserProfileStore } from "@/store/user";
import { toaster } from "@/components/ui/toaster";
import { LuPlus } from "react-icons/lu";
import { globalRouter } from "@/utils/globalRouter";
import { useAuthStore } from "@/store/auth";

const ProfilePage = () => {
  const [user, setUser] = useState<UserProfile>({
    nickname: "",
    degree: "",
    email: "",
    picture: undefined,
  });
  const { getUserProfile, updateUserProfile } = useUserProfileStore();
  const { logout } = useAuthStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { success, message, data: userFetched } = await getUserProfile();
      if (!success) {
        toaster.create({ description: message, title: "Error", type: "error" });
      } else {
        setUser({ ...user, ...userFetched });
      }
    };
    fetchUserProfile();
  }, []);

  async function handleUpdateUser() {
    const {
      success,
      message,
      data: userUpdated,
    } = await updateUserProfile({
      nickname: user.nickname,
      degree: user.degree,
      picture: user.picture,
    });
    if (!success) {
      toaster.create({ description: message, title: "Error", type: "error" });
    } else {
      setUser({ ...user, ...userUpdated });
      toaster.create({
        description: message,
        title: "Success",
        type: "success",
      });
    }
  }

  async function handleLogoutUser() {
    const { success, message } = await logout();
    if (success) {
      toaster.create({ description: message, title: "Error", type: "error" });
    } else {
      globalRouter.navigate?.("/login");
    }
  }

  return (
    <Container
      background={"var(--white-500)"}
      color="black"
      borderRadius={4}
      px={10}
      py={10}
      mt={10}
      h={"100vh"}
    >
      <Heading size={"4xl"} fontSize={"3xl"}>
        Meu Perfil
      </Heading>
      <hr />
      <Flex
        mt={10}
        mb={10}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        flexWrap="wrap"
        gap="20px"
        position="relative"
      >
        <Button
          position="absolute"
          top={0}
          right={0}
          bg="red.600"
          color="white"
          _hover={{ bg: "red.700" }}
          w="fit-content"
          p={5}
          onClick={handleLogoutUser}
        >
          Logout
        </Button>
        <VStack justifyContent={"flex-start"}>
          <Image
            src={user.picture ? URL.createObjectURL(user.picture) : ""}
            alt={"user profile picture"}
            rounded={"full"}
            objectFit={"contain"}
            boxSize="150px"
          />
          <Button
            mt={"1rem"}
            bg="cyan.600"
            color="white"
            size="xl"
            w="full"
            _hover={{ bg: "cyan.700" }}
            onClick={() => {
              document.getElementById("fileInput")?.click();
            }}
          >
            Choose File
          </Button>
          <Input
            id="fileInput"
            type="file"
            display={"none"}
            onChange={(e) => {
              setUser({ ...user, picture: e.target.files?.[0] });
            }}
          />
        </VStack>
        <SimpleGrid columns={2} gap="20px">
          <Field label="Nickname" required>
            <Input
              color={"black"}
              size="md"
              px={".75rem"}
              py={".25rem"}
              fontSize="md"
              bg="#f5f1e3"
              border="1px solid black"
              placeholder="Enter a nickname"
              name="nickname"
              value={user.nickname}
              onChange={(e) => setUser({ ...user, nickname: e.target.value })}
              width="100%"
            />
          </Field>
          <Field label="Degree" required>
            <Input
              color={"black"}
              size="md"
              px={".75rem"}
              py={".25rem"}
              fontSize="md"
              bg="#f5f1e3"
              border="1px solid black"
              placeholder="Enter your degree"
              name="degree"
              value={user.degree}
              onChange={(e) => setUser({ ...user, degree: e.target.value })}
              width="100%"
            />
          </Field>

          <Field label="Email" required>
            <Input
              color={"black"}
              size="md"
              px={".75rem"}
              py={".25rem"}
              fontSize="md"
              bg="#f5f1e3"
              border="1px solid black"
              placeholder="Enter your email"
              name="email"
              value={user.email}
              width="100%"
            />
          </Field>
        </SimpleGrid>
        <Button
          bg="cyan.600"
          color="white"
          size="lg"
          _hover={{ bg: "cyan.700" }}
          type="submit"
          p={5}
          onClick={handleUpdateUser}
          position="absolute"
          bottom={-15}
          right={0}
        >
          Save
        </Button>
      </Flex>
      <Heading size={"4xl"} fontSize={"3xl"}>
        Posts
      </Heading>
      <hr />
      <HStack
        justifyContent={"flex-end"}
        alignItems={"center"}
        flexWrap="wrap"
        gap={2}
        mt={5}
      >
        <Text fontSize={"lg"}>Novo Post</Text>
      </HStack>
    </Container>
  );
};

export default ProfilePage;
