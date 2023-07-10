import { useToast } from "@hooks/useToast";
import { supabase } from "@services/supabase";
import { formatDateToUTC } from "@shared/utils/formatDateToUTC";
import { useMutation, useQuery } from "react-query";
import { Notification } from "./";

export function useNotificationsCentre() {
  const toast = useToast();

  const {
    data: notifications,
    isError,
    refetch: refetchNotifications,
  } = useQuery("unreadNotifications", fetchNotifications, {
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const readNotificationMutation = useMutation(doReadNotification, {
    onSuccess: () => refetchNotifications(),
  });

  async function fetchNotifications(): Promise<Notification[]> {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .is("read", false)
      .order("created_at", { ascending: false });

    if (error) throw new Error("Erro ao buscar notificações.");

    return data.map((notification) => ({
      ...notification,
      read: !!notification.read,
      createdAt: formatDateToUTC(new Date(notification.created_at)),
    }));
  }

  async function doReadNotification(notificationId: number) {
    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("id", notificationId);

    if (error) {
      toast({
        title: "Erro ao marcar notificação como lida.",
        description:
          "Ocorreu um erro ao marcar a notificação como lida. Por favor, tente novamente mais tarde.",
        status: "error",
      });
      throw new Error("Erro ao marcar notificação como lida.");
    }
  }

  return {
    notifications,
    isError,
    readNotification: readNotificationMutation.mutate,
  };
}
