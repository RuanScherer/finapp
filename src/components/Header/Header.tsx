import bgIllustration from "@assets/background-illustration.svg";
import logo from "@assets/logo-light.svg";
import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import { Container } from "@components/Container";
import { useAuth } from "@contexts/AuthContext";
import { NotificationsCentre } from "@features/NotificationsCentre/NotificationsCentre";
import { FiTrendingUp } from "react-icons/fi";
import { RxDashboard, RxExit, RxPlus, RxStack } from "react-icons/rx";
import { Link as ReactRouterLink } from "react-router-dom";
import { ConfirmSignOutModal } from "./ConfirmSignOutModal";
import { Link } from "./Link";

export function Header() {
  const { user, signOut } = useAuth();
  const confirmSignOutDisclosure = useDisclosure();

  return (
    <>
      <Box
        bgColor="primary.500"
        bgImage={`url(${bgIllustration})`}
        bgRepeat="no-repeat"
        bgPosition="right top"
        bgSize="cover"
        shadow="md"
      >
        <Container>
          <HStack gap={[1, 2]} justifyContent="space-between">
            <Image src={logo} w={12} h={12} />

            <HStack>
              <ReactRouterLink to="/transaction/new">
                <Button
                  display={["none", "flex"]}
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
                  display={["flex", "none"]}
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

              <NotificationsCentre />

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

              <Avatar src={user?.avatar ?? undefined} name={user?.name} />
            </HStack>
          </HStack>

          <HStack gap={1} flex={1} mt={5} mb={4}>
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

          <HStack wrap="wrap" gap="1" rowGap="2" py="2">
            <Link to="/dashboard" icon={<RxDashboard />} label="Dashboard" />

            <Link to="/transactions" icon={<RxStack />} label="Transações" />

            <Link to="/insights" icon={<FiTrendingUp />} label="Métricas" />
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
