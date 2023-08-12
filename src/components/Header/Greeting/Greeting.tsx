import { Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { useAuth } from "@contexts/AuthContext";

export function Greeting() {
  const { user } = useAuth()

  return (
    <HStack gap={1} flex={1} mt={5}>
      <VStack alignItems="start">
        <Heading
          color="whiteAlpha.900"
          fontWeight="semibold"
          fontSize={["lg", "xl", "2xl"]}
          lineHeight={1}
        >
          Olá, {user!.name}
        </Heading>

        <Text
          as="time"
          color="whiteAlpha.800"
          fontSize={"sm"}
          lineHeight={1}
        >
          {new Date().toLocaleDateString("pt-BR", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </VStack>
    </HStack>
  )
}