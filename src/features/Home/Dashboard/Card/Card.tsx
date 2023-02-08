import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { boxShadow } from "../../../../theme";

interface CardProps {
  children: ReactNode
}

export function Card({ children }: CardProps) {
  return (
    <Flex
      flexDirection="column"
      alignItems="stretch"
      bgColor="background.100"
      borderRadius="xl"
      boxShadow={boxShadow[100]}
      h="full"
      p="5"
    >
      {children}
    </Flex>
  )
}
