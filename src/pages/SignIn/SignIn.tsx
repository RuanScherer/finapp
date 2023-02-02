import { Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { colors } from "../../theme";

export function SignIn() {
  const { signInWithGoogle } = useAuth();

  return (
    <Center minH="100vh">
      <Flex direction="column" alignItems="center">
        <Heading fontSize="4xl" fontWeight="semibold" letterSpacing="wide">
          <Text color="primary.500" display="inline">
            Fin
          </Text>
          Share
        </Heading>

        <Text
          fontSize="lg"
          textAlign="center"
          letterSpacing="wide"
          color="text.700"
          my="3"
        >
          Enter the platform using your Google account
        </Text>

        <Button
          type="submit"
          display="flex"
          gap="2"
          bgColor="primary.500"
          color="light.500"
          mt="4"
          w="200px"
          maxW="100%"
          size="lg"
          _hover={{ bgColor: "primary.600" }}
          onClick={signInWithGoogle}
        >
          <FaGoogle fill={colors.light[500]} />
          Google
        </Button>
      </Flex>
    </Center>
  );
}
