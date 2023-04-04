import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "@contexts/AuthContext";
import { RxDashboard, RxPlus, RxStack } from "react-icons/rx";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link } from "./Link";

export function Header() {
  const { user } = useAuth();

  return (
    <>
      <Flex as="header" justifyContent="space-between" alignItems="center">
        <Heading fontSize="3xl" fontWeight="bold" letterSpacing="wide">
          <Text color="primary.500" display="inline">
            Fin
          </Text>
          App
        </Heading>

        <Box display={["none", "block"]}>
          <ReactRouterLink to="/transaction/new">
            <Button leftIcon={<RxPlus />}>Adicionar transação</Button>
          </ReactRouterLink>
        </Box>

        <HStack alignItems="center" gap={2}>
          <IconButton
            display={["flex", "none"]}
            icon={<RxPlus size={18} />}
            aria-label="Adicionar transação"
            alignItems="center"
            borderRadius="full"
          />

          <Avatar
            src={user?.avatar ?? undefined}
            name={user?.name}
            bgColor="light.100"
          />
        </HStack>
      </Flex>

      <HStack
        alignItems="center"
        justifyContent="center"
        wrap="wrap"
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
      </HStack>
    </>
  );
}
