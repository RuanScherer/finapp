import { ChakraProps, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface CardProps extends ChakraProps {
  children: ReactNode;
}

export function Card({ children, ...rest }: CardProps) {
  return (
    <Flex
      flexDirection="column"
      alignItems="stretch"
      bgColor="white"
      borderRadius="xl"
      shadow="sm"
      h="full"
      p="5"
      {...rest}
    >
      {children}
    </Flex>
  );
}
