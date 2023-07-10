import { Text } from "@chakra-ui/react";
import { LinkProps } from "./";

export function Link({ children, ...rest }: LinkProps) {
  return (
    <Text
      fontSize="sm"
      color="primary.500"
      cursor="pointer"
      textAlign="center"
      w="fit-content"
      mx="auto"
      _hover={{
        filter: "brightness(0.8)",
      }}
      {...rest}
    >
      {children}
    </Text>
  )
}