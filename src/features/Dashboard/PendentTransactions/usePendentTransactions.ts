import { useAuth } from "@contexts/AuthContext";
import { useToast } from "@hooks/useToast";
import { fauna } from "@services/faunadb";
import { formatDateForFauna } from "@shared/utils/formatDateForFauna";
import { getRangeDatesForCurrentMonth } from "@shared/utils/getRangeDates";
import { query as q } from "faunadb";
import { useQuery } from "react-query";
import { LastPendentTransactionByMonthQueryReturn } from "./PendentTransactions.types";

export function usePendentTransactions() {
  const { user } = useAuth();
  const toast = useToast();

  const { data: lastPendentTransactions } = useQuery(
    "dashboardPendentTransactions",
    fetchPendentTransactions,
    {
      staleTime: 10 * 60 * 1000, // 10 minutes
    }
  );

  async function fetchPendentTransactions() {
    const { fromDate, toDate } = getRangeDatesForCurrentMonth();

    try {
      const transactions =
        await fauna.query<LastPendentTransactionByMonthQueryReturn>(
          q.Call(
            "get_pendent_transactions",
            user!.id,
            q.Date(formatDateForFauna(fromDate)),
            q.Date(formatDateForFauna(toDate))
          )
        );
      const formattedTransactions = transactions.data.map((transaction) => ({
        ...transaction,
        dueDate: transaction.dueDate.date,
      }));
      return formattedTransactions;
    } catch {
      toast({
        title: "Erro ao buscar dados.",
        description:
          "Ocorreu um erro ao buscar alguns dados para o dashboard. Por favor, tente recarregar a página.",
        status: "error",
      });
    }
  }

  return { lastPendentTransactions };
}
