import { Avatar, Button, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import { RxAvatar, RxDashboard, RxPlus, RxStack } from "react-icons/rx";
import { Link as ReactRouterLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "./Link";

export function Header() {
  const { user } = useAuth()

  return (
    <>
      <Flex as="header" justifyContent="space-between" alignItems="center">
        <Heading
          fontSize="3xl"
          fontWeight="bold"
          letterSpacing="wide"
        >
          <Text color="primary.500" display="inline">
            Fin
          </Text>
          App
        </Heading>

        <ReactRouterLink to="/transaction/new">
          <Button
            leftIcon={<RxPlus />}
          >
            Adicionar transação
          </Button>
        </ReactRouterLink>

        <Avatar
          src={user?.avatar ?? undefined}
          name={user?.name}
          bgColor="light.100"
        />
      </Flex>

      <HStack
        alignItems="center"
        gap="1"
        py="2"
        mt="6"
      >
        <Link to="/dashboard">
          <RxDashboard />
          Dashboard
        </Link>

        <Link to="/transactions">
          <RxStack size="18" />
          Transações
        </Link>

        <Link to="settings">
          <RxAvatar size="18" />
          Configurações
        </Link>
      </HStack>
    </>
  )
}