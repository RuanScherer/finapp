import bgIllustration from "@assets/background-illustration.svg";
import logo from "@assets/logo-light.svg";
import {
  Avatar,
  Box, HStack,
  IconButton,
  Image, useDisclosure
} from "@chakra-ui/react";
import { Container } from "@components/Container";
import { useAuth } from "@contexts/AuthContext";
import { NotificationsCentre } from "@features/NotificationsCentre/NotificationsCentre";
import { RxExit, RxHamburgerMenu } from "react-icons/rx";
import { AddTransactionButton } from "./AddTransactionButton";
import { ConfirmSignOutModal } from "./ConfirmSignOutModal";
import { DrawerMenu } from "./DrawerMenu";
import { Greeting } from "./Greeting";
import { Tabs } from "./Tabs/Tabs";

const buttonCommonProps = {
  bgColor: "whiteAlpha.200",
  textColor: "whiteAlpha.900",
  _hover: {
    bgColor: "whiteAlpha.300",
  },
}

export function Header() {
  const { user, signOut } = useAuth();
  const confirmSignOutDisclosure = useDisclosure();
  const drawerMenuDisclosure = useDisclosure();

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
              <AddTransactionButton />
              <NotificationsCentre />

              <IconButton
                {...buttonCommonProps}
                display={["none", "none", "flex"]}
                icon={<RxExit color="white" strokeWidth={0.6} />}
                aria-label="Sair do FinApp"
                borderRadius="full"
                onClick={confirmSignOutDisclosure.onOpen}
              />

              <IconButton
                {...buttonCommonProps}
                display={["flex", "flex", "none"]}
                icon={<RxHamburgerMenu color="white" strokeWidth={0.6} />}
                aria-label="Sair do FinApp"
                borderRadius="full"
                onClick={drawerMenuDisclosure.onOpen}
              />

              <Avatar src={user?.avatar ?? undefined} name={user?.name} />
            </HStack>
          </HStack>

          <Greeting />
          <Tabs />
        </Container>
      </Box>

      <ConfirmSignOutModal
        isOpen={confirmSignOutDisclosure.isOpen}
        onClose={confirmSignOutDisclosure.onClose}
        onConfirm={signOut}
      />

      <DrawerMenu
        isOpen={drawerMenuDisclosure.isOpen}
        onClose={drawerMenuDisclosure.onClose}
        onSignOut={confirmSignOutDisclosure.onOpen}
      />
    </>
  );
}
