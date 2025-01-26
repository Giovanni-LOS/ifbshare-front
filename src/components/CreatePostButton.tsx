import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";

const CreatePostButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    async function handleAddPost() {
        // Implement add post
    }

    return (<>
        <Button size="xs" rounded={"full"} bg="cyan.600" color="white" _hover={{ bg: "cyan.700" }} boxShadow="0 2px 2px rgba(0, 0, 0, 0.24)" onClick={() => setIsOpen(true)}>
            <IoMdAdd size={12}/>
        </Button>
    </>);
};

export default CreatePostButton;