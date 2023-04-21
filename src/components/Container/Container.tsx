import { Box, BoxProps } from "@chakra-ui/react";

interface ContainerProps extends BoxProps {
  children: React.ReactNode;
}

export function Container({ children, ...rest }: ContainerProps) {
  return (
    <Box w="full" maxW="1200px" mx="auto" px="4" py="6" {...rest}>
      {children}
    </Box>
  );
}
