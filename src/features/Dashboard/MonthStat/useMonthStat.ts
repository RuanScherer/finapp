import { useAuth } from "@contexts/AuthContext";
import { useToast } from "@hooks/useToast";
import { fauna } from "@services/faunadb";
import { TransactionType } from "@shared/enums/transactionType";
import { formatDateForFauna } from "@shared/utils/formatDateForFauna";
import { getRangeDatesForCurrentMonth } from "@shared/utils/getRangeDatesForCurrentMonth";
import { query as q } from "faunadb";
import { useQuery } from "react-query";
import { GetMonthStatQueryReturn } from "./MonthStat.types";

export function useMonthStat(type: TransactionType) {
  const { user } = useAuth();
  const toast = useToast();

  const {
    data: amount,
    isLoading,
    isError,
  } = useQuery(["dashboardMonthStat", type], fecthMonthStat, {
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  async function fecthMonthStat() {
    const { fromDate, toDate } = getRangeDatesForCurrentMonth();
    const fromDateFormatted = q.Date(formatDateForFauna(fromDate));
    const toDateFormatted = q.Date(formatDateForFauna(toDate));

    try {
      const result = await fauna.query<GetMonthStatQueryReturn>(
        q.Call(
          "get_month_balance",
          type,
          user!.id,
          fromDateFormatted,
          toDateFormatted
        )
      );
      return result.data[0];
    } catch {
      toast({
        title: "Erro ao buscar dados.",
        description:
          "Ocorreu um erro ao buscar alguns dados para o dashboard. Por favor, tente recarregar a página.",
        status: "error",
      });
    }
  }

  return { amount, isLoading, isError };
}
