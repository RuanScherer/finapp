import { Box } from "@chakra-ui/react";

interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  return (
    <Box
      w="full"
      maxW="1024px"
      mx="auto"
      px="4"
      py="6"
    >
      {children}
    </Box>
  );
}