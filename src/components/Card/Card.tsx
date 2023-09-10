import { Flex, FlexProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface CardProps extends FlexProps {
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
