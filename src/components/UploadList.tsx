import { FileCustomMetaData } from "@/store/file";
import { Box, Text, IconButton, VStack } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";

interface FileUploadListProps {
    files: File[] | undefined | FileCustomMetaData[];
    onRemoveFile?: (file: any) => void;
}

const UploadList = ({ files, onRemoveFile }: FileUploadListProps) => {
    return (
        <Box mt={4} width="100%">
            <VStack spaceY={3}>
                {files && files.map((file, index) => (
                    <Box key={index} display="flex" justifyContent="space-between" alignItems="center" bg="#f5f1e3" p={2} borderRadius="md" w="full">
                        <Text>{file.name}</Text>
                        <IconButton
                            aria-label="Remove file"
                            size="sm"
                            onClick={() => onRemoveFile && onRemoveFile(file)}
                        >
                            <IoMdClose />
                        </IconButton>
                    </Box>
                ))}
            </VStack>
        </Box>
    );
};

export default UploadList;
