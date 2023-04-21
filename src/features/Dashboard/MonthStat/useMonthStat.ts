import { useAuth } from "@contexts/AuthContext";
import { useToast } from "@hooks/useToast";
import { fauna } from "@services/faunadb";
import { TransactionType } from "@shared/enums/transactionType";
import { formatDateForFauna } from "@shared/utils/formatDateForFauna";
import { getRangeDatesForCurrentMonth } from "@shared/utils/getRangeDates";
import { query as q } from "faunadb";
import { QueryFunctionContext, useQuery } from "react-query";
import { GetMonthPendenciesQueryReturn, GetMonthStatQueryReturn } from "./MonthStat.types";

export function useMonthStat(type: TransactionType) {
  const { user } = useAuth();
  const toast = useToast();

  const { data: amount } = useQuery(
    ["dashboardMonthStat", type],
    fecthMonthStat,
    {
      staleTime: 10 * 60 * 1000, // 10 minutes
    }
  );

  const { data: pendentAmount } = useQuery(
    ["dashboardMonthPendencies", type],
    fetchMonthPendencies,
    {
      staleTime: 5 * 60 * 1000,
    }
  );

  async function fecthMonthStat() {
    const { fromDateFormatted, toDateFormatted } = getFormattedDatesForQuery();

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
      showErrorMessage()
    }
  }

  async function fetchMonthPendencies({ queryKey }: QueryFunctionContext<any>) {
    const [_key, transactionType] = queryKey;
    const { fromDateFormatted, toDateFormatted } = getFormattedDatesForQuery();

    try {
      const result = await fauna.query<GetMonthPendenciesQueryReturn>(
        q.Call(
          "get_month_pendent_balance",
          transactionType,
          user!.id,
          fromDateFormatted,
          toDateFormatted
        )
      );
      return result.data[0];
    } catch {
      showErrorMessage()
    }
  }

  function getFormattedDatesForQuery() {
    const { fromDate, toDate } = getRangeDatesForCurrentMonth();
    const fromDateFormatted = q.Date(formatDateForFauna(fromDate));
    const toDateFormatted = q.Date(formatDateForFauna(toDate));

    return { fromDateFormatted, toDateFormatted };
  }

  function showErrorMessage() {
    toast({
      title: "Erro ao buscar dados.",
      description:
        "Ocorreu um erro ao buscar alguns dados para o dashboard. Por favor, tente recarregar a página.",
      status: "error",
    });
  }

  return { amount, pendentAmount };
}
