import { Heading, List } from "@chakra-ui/react";
import { EmptyState } from "@components/EmptyState";
import { Link } from "@components/Link";
import { Page } from "@components/Page";
import { Notification } from "@features/NotificationsCentre/Notification";
import { useNotifications } from "./useNotifications";

export function Notifications() {
  const {
    notifications,
    isError,
    readNotification,
    hasMoreNotifications,
    loadMoreNotifications,
  } = useNotifications();

  return (
    <>
      <Page.TitleBar title="Notificações" />

      <Page.Content maxW={800}>
        <Heading fontSize="xl" fontWeight="semibold" w="full" mb={2}>
          Todas as notificações
        </Heading>

        <List spacing={2} mt={4}>
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
            Parece que você não tem nenhuma notificação ainda.
          </EmptyState>
        )}

        {isError && (
          <EmptyState>
            Não foi possível carregar as notificações, tente novamente mais
            tarde.
          </EmptyState>
        )}

        {!!notifications?.length && hasMoreNotifications && (
          <Link mt={4} onClick={loadMoreNotifications}>
            Ver mais
          </Link>
        )}
      </Page.Content>
    </>
  );
}
