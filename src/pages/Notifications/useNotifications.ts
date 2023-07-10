import { useToast } from "@hooks/useToast";
import { supabase } from "@services/supabase";
import { formatDateToUTC } from "@shared/utils/formatDateToUTC";
import { getPagination } from "@shared/utils/getPagination";
import {
  QueryFunctionContext,
  useInfiniteQuery,
  useMutation,
} from "react-query";

export function useNotifications() {
  const toast = useToast();

  const {
    data,
    isError,
    refetch: refetchNotifications,
    fetchNextPage: fetchMoreNotifications,
    hasNextPage: hasMoreNotifications,
  } = useInfiniteQuery("notifications", fetchNotifications, {
    getNextPageParam: (lastPage) => {
      if (!lastPage.total) return undefined;

      if (lastPage.page + 1 >= Math.ceil(lastPage.total! / 10))
        return undefined;

      return lastPage.page + 1;
    },
    refetchInterval: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const readNotificationMutation = useMutation(doReadNotification, {
    onSuccess: () => refetchNotifications(),
  });

  async function fetchNotifications({
    pageParam = 0,
  }: QueryFunctionContext<any>) {
    const { from, to } = getPagination(pageParam, 10);
    const { data, error, count } = await supabase
      .from("notifications")
      .select("*", { count: "exact" })
      .range(from, to)
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Erro ao buscar notificações.",
        description:
          "Ocorreu um erro ao buscar as notificações. Por favor, tente novamente mais tarde.",
        status: "error",
      });
      throw new Error("Erro ao buscar notificações.");
    }

    const notifications = data.map((notification) => ({
      ...notification,
      read: !!notification.read,
      createdAt: formatDateToUTC(new Date(notification.created_at)),
    }));
    return {
      notifications,
      page: pageParam,
      total: count,
    };
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

  function loadMoreNotifications() {
    fetchMoreNotifications();
  }

  return {
    notifications: data?.pages.map((i) => i.notifications).flat() ?? [],
    isError,
    readNotification: readNotificationMutation.mutate,
    hasMoreNotifications,
    loadMoreNotifications,
  };
}
