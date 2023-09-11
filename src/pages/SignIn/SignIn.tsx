import logo from "@assets/logo-light.svg";
import bg from "@assets/sign-in-background.svg";
import { Box, Button, Center, Image, Text, VStack } from "@chakra-ui/react";
import { useAuth } from "@contexts/AuthContext";
import { colors } from "@theme/index";
import { FaGoogle } from "react-icons/fa";

export function SignIn() {
  const { signInWithGoogle } = useAuth();

  return (
    <Box
      background={`url('${bg}')`}
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      backgroundSize="cover"
    >
      <Center
        h="full"
        minH="100vh"
        px={3}
        py={8}
        bg="whiteAlpha.300"
      >
        <VStack
          bg={`radial-gradient(${colors.primary[400]}, ${colors.primary[500]})`}
          w="md"
          maxW="100%"
          minH="sm"
          shadow="lg"
          borderRadius="xl"
          overflow="hidden"
        >
          <Center
            flex={1}
            flexDirection="column"
            p={[3, 3, 8]}
            gap={3}
          >
            <Image
              src={logo}
              alt="Quadrado branco com escrita 'FinApp' em roxo - Logo do FinApp"
              w={16}
              h={16}
            />

            <Text
              fontSize="lg"
              textAlign="center"
              letterSpacing="wide"
              color="whiteAlpha.900"
            >
              Use sua conta do Google para entrar na plataforma.
            </Text>

            <Button
              type="submit"
              display="flex"
              gap="2"
              bgColor="whiteAlpha.300"
              colorScheme="whiteAlpha"
              w="200px"
              maxW="100%"
              mt={2}
              size="lg"
              _hover={{ bgColor: "whiteAlpha.400" }}
              onClick={signInWithGoogle}
            >
              <FaGoogle fill={colors.light[500]} />
              Google
            </Button>
          </Center>

          <Center
            bg="background.200"
            w="full"
            px={2}
            py={1.5}
            style={{ marginTop: 0 }}
          >
            <Text fontSize="xs" color="primary.500">
              Criado com 💙 por
              {" "}
              <Text
                color="inherit"
                fontWeight="medium"
                display="inline"
              >
                Ruan Scherer
              </Text>
            </Text>
          </Center>
        </VStack>
      </Center>
    </Box>
  );
}
