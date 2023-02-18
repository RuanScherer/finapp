import { ChakraProps, Flex } from "@chakra-ui/react";
import { boxShadow } from "@theme/index";
import { ReactNode } from "react";

interface CardProps extends ChakraProps {
  children: ReactNode;
}

export function Card({ children, ...rest }: CardProps) {
  return (
    <Flex
      flexDirection="column"
      alignItems="stretch"
      bgColor="background.100"
      borderRadius="xl"
      boxShadow={boxShadow[100]}
      h="full"
      p="5"
      {...rest}
    >
      {children}
    </Flex>
  );
}
