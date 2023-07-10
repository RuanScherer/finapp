import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  List,
  useDisclosure,
} from "@chakra-ui/react";
import { EmptyState } from "@components/EmptyState";
import { Link } from "@components/Link";
import { useToast } from "@hooks/useToast";
import { RxBell } from "react-icons/rx";
import { Link as ReactRouterLink } from "react-router-dom";
import { Notification } from "./Notification";
import { useNotificationsCentre } from "./useNotificationsCentre";

export function NotificationsCentre() {
  const { notifications, isError, readNotification } = useNotificationsCentre();
  const disclosure = useDisclosure();
  const toast = useToast();

  function handleClickOpenNotificationsCentre() {
    if (isError) {
      toast({
        title: "Erro ao carregar notificações",
        description:
          "Ocorreu um erro ao carregar as notificações. Tente recarregar a página.",
        status: "error",
      });
      return;
    }

    disclosure.onOpen();
  }

  return (
    <>
      <Box position="relative">
        <IconButton
          bgColor="whiteAlpha.200"
          textColor="whiteAlpha.900"
          icon={<RxBell color="white" strokeWidth={0.6} />}
          aria-label="Sair do FinApp"
          borderRadius="full"
          _hover={{
            bgColor: "whiteAlpha.300",
          }}
          onClick={handleClickOpenNotificationsCentre}
        />
        <Box
          position="absolute"
          top={0}
          right={0}
          w={2}
          h={2}
          bgColor="red.500"
          borderRadius="full"
          display={
            notifications?.some((notification) => !notification.read)
              ? "block"
              : "none"
          }
        />
      </Box>

      <Drawer
        isOpen={disclosure.isOpen}
        onClose={disclosure.onClose}
        placement="right"
        colorScheme="primary"
        size="md"
        closeOnEsc
        closeOnOverlayClick
      >
        <DrawerOverlay />

        <DrawerContent bgColor="background.200">
          <DrawerCloseButton />

          <DrawerHeader>Notificações não lidas</DrawerHeader>

          <DrawerBody>
            <List spacing={2}>
              {notifications?.map((notification) => (
                <Notification
                  notification={notification}
                  onRead={(notification) => readNotification(notification.id)}
                  key={notification.id}
                />
              ))}
            </List>

            {!notifications?.length && (
              <EmptyState>
                Parece que você não tem nenhuma notificação não lida, mas você
                pode ver todas as notificações se quiser.
              </EmptyState>
            )}

            <Link mt={4}>
              <ReactRouterLink to="/notifications">Ver todas</ReactRouterLink>
            </Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
