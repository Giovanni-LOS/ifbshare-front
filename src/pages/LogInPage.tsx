import {Button, Container, Input, VStack} from "@chakra-ui/react";
import {Link} from "react-router-dom";

const LogInPage = () => {

    return (
        <Container >
            <VStack>
                <Input
                    placeholder={"Email"}
                    name={"email"}
                />
                <Input
                    placeholder={"Password"}
                    name={"password"}
                    type={"password"}
                />
                <Button>
                    Log In
                </Button>
                Haven't you signed before?
                <Button>
                    <Link to={"/signup"}>Sign Up</Link>
                </Button>
            </VStack>
        </Container>
    );
}

export default LogInPage;