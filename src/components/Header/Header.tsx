import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Text,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import { Container } from "@components/Container";
import { useAuth } from "@contexts/AuthContext";
import { RxDashboard, RxExit, RxPlus, RxStack } from "react-icons/rx";
import { Link as ReactRouterLink } from "react-router-dom";
import { ConfirmSignOutModal } from "./ConfirmSignOutModal";
import { Link } from "./Link";

export function Header() {
  const { user, signOut } = useAuth();
  const confirmSignOutDisclosure = useDisclosure();

  return (
    <>
      <Box bgColor="primary.500" shadow="md">
        <Container>
          <HStack gap={[1, 2]}>
            <HStack alignItems="center" gap={1} flex={1}>
              <Avatar
                src={user?.avatar ?? undefined}
                name={user?.name}
                bgColor="light.100"
                w={[10, 14]}
                h={[10, 14]}
              />

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
                  display={["none", "block"]}
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

            <ReactRouterLink to="/transaction/new">
              <Button
                display={["none", "none", "flex"]}
                bgColor="whiteAlpha.200"
                textColor="whiteAlpha.900"
                leftIcon={<RxPlus color="white" strokeWidth={1} />}
                _hover={{
                  bgColor: "whiteAlpha.300",
                }}
              >
                Adicionar transação
              </Button>

              <IconButton
                display={["flex", "flex", "none"]}
                bgColor="whiteAlpha.200"
                textColor="whiteAlpha.900"
                icon={<RxPlus color="white" strokeWidth={1} />}
                aria-label="Sair do FinApp"
                borderRadius="full"
                _hover={{
                  bgColor: "whiteAlpha.300",
                }}
              />
            </ReactRouterLink>

            <IconButton
              bgColor="whiteAlpha.200"
              textColor="whiteAlpha.900"
              icon={<RxExit color="white" strokeWidth={0.6} />}
              aria-label="Sair do FinApp"
              borderRadius="full"
              _hover={{
                bgColor: "whiteAlpha.300",
              }}
              onClick={confirmSignOutDisclosure.onOpen}
            />
          </HStack>

          <HStack alignItems="center" wrap="wrap" gap="1" py="2" mt="4">
            <Link to="/dashboard">
              <RxDashboard />
              Dashboard
            </Link>

            <Link to="/transactions">
              <RxStack size="18" />
              Transações
            </Link>
          </HStack>
        </Container>
      </Box>

      <ConfirmSignOutModal
        isOpen={confirmSignOutDisclosure.isOpen}
        onClose={confirmSignOutDisclosure.onClose}
        onConfirm={signOut}
      />
    </>
  );
}
