import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "@contexts/AuthContext";
import { RxDashboard, RxExit, RxPlus, RxStack } from "react-icons/rx";
import { Link as ReactRouterLink } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import { Link } from "./Link";

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <>
      <Flex as="header" justifyContent="space-between" alignItems="center">
        <Image
          src={logo}
          width={12}
          height={12}
          alt="Quadrado roxo arredondado escrito FinApp - Logo do FinApp"
        />

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

          <Menu autoSelect={false}>
            <MenuButton>
              <Avatar
                src={user?.avatar ?? undefined}
                name={user?.name}
                bgColor="light.100"
              />
            </MenuButton>

            <MenuList
              shadow="md"
              bgColor="background.100"
              borderColor="gray.100"
            >
              <MenuItem onClick={signOut}>
                <HStack gap={1}>
                  <RxExit />
                  <Text>Sair</Text>
                </HStack>
              </MenuItem>
            </MenuList>
          </Menu>
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
