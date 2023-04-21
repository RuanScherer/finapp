import { useAuth } from "@contexts/AuthContext";
import { useToast } from "@hooks/useToast";
import { fauna } from "@services/faunadb";
import { formatDateForFauna } from "@shared/utils/formatDateForFauna";
import { getRangeDatesForCurrentMonth } from "@shared/utils/getRangeDates";
import { query as q } from "faunadb";
import { useQuery } from "react-query";
import { GetTransactionsPerCategoryQueryResult } from "./TransactionsPerCategory.type";

export function useTransactionsPerCategory() {
  const { user } = useAuth();
  const toast = useToast();

  const { data: transactionsPerCategory } = useQuery(
    "dashboardTransactionsPerCategory",
    fetchTransactionsPerCategory,
    {
      staleTime: 10 * 60 * 1000, // 10 minutes
    }
  );

  async function fetchTransactionsPerCategory() {
    const { fromDate, toDate } = getRangeDatesForCurrentMonth();

    try {
      const result = await fauna.query<GetTransactionsPerCategoryQueryResult>(
        q.Call(
          "get_transactions_per_category",
          user!.id,
          q.Date(formatDateForFauna(fromDate)),
          q.Date(formatDateForFauna(toDate))
        )
      );
      return result.data;
    } catch {
      toast({
        title: "Erro ao buscar dados.",
        description:
          "Ocorreu um erro ao buscar alguns dados para o dashboard. Por favor, tente recarregar a página.",
        status: "error",
      });
    }
  }

  return { transactionsPerCategory };
}
