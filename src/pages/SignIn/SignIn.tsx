import logo from "@assets/logo.svg";
import { Button, Center, Flex, Image, Text } from "@chakra-ui/react";
import { useAuth } from "@contexts/AuthContext";
import { colors } from "@theme/index";
import { FaGoogle } from "react-icons/fa";

export function SignIn() {
  const { signInWithGoogle } = useAuth();

  return (
    <Center minH="100vh" p={2}>
      <Flex direction="column" alignItems="center">
        <Image
          src={logo}
          alt="Quadrado roxo com escrita 'FinApp' em branco - Logo do FinApp"
          w={20}
          h={20}
        />

        <Text
          fontSize="lg"
          textAlign="center"
          letterSpacing="wide"
          color="text.700"
          my="3"
        >
          Entre na plataforma usando sua conta do Google.
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
