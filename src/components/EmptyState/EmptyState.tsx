import { ChakraProps, HStack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface EmptyStateProps extends ChakraProps {
  children: ReactNode | ReactNode[];
}

export function EmptyState({ children, ...rest }: EmptyStateProps) {
  return (
    <HStack
      bgColor="gray.100"
      borderRadius="md"
      w="full"
      px="4"
      py="6"
      {...rest}
    >
      <Text fontSize={["sm", "md"]} textAlign="center" lineHeight="short" flex={1}>
        {children}
      </Text>
    </HStack>
  );
}
