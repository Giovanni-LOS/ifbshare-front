import { Button } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface CreatePostButtonProps {
    _redirect?: string;
}

const CreatePostButton = ({ _redirect }: CreatePostButtonProps) => { 
    const navigate = useNavigate();

    function handleAddPost() {
        navigate(`/create-post?_redirect=${_redirect || ''}`, { replace: true });
    }

    return (<>
        <Button size="xs" rounded={"full"} bg="cyan.600" color="white" _hover={{ bg: "cyan.700" }} boxShadow="0 2px 2px rgba(0, 0, 0, 0.24)" onClick={handleAddPost}>
            <IoMdAdd size={12}/>
        </Button>
    </>);
};

export default CreatePostButton;