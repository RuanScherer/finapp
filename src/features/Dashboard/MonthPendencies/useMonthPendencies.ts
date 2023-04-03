import { useAuth } from "@contexts/AuthContext";
import { useToast } from "@hooks/useToast";
import { fauna } from "@services/faunadb";
import { TransactionType } from "@shared/enums/transactionType";
import { formatDateForFauna } from "@shared/utils/formatDateForFauna";
import { getRangeDatesForCurrentMonth } from "@shared/utils/getRangeDates";
import { query as q } from "faunadb";
import { QueryFunctionContext, useQuery } from "react-query";
import { GetMonthPendenciesQueryReturn } from "./MonthPendencies.types";

export function useMonthPendencies() {
  const { user } = useAuth();
  const toast = useToast();

  const {
    data: pendentAmountToReceive,
    isLoading: isLoadingPendentAmountToReceive,
    isError: isErrorPendentAmountToReceive,
  } = useQuery(
    ["dashboardMonthPendencies", { transactionType: TransactionType.OUTCOME }],
    fetchMonthPendencies,
    {
      staleTime: 5 * 60 * 1000,
    }
  );

  const {
    data: pendentAmountToPay,
    isLoading: isLoadingPendentAmountToPay,
    isError: isErrorPendentAmountToPay,
  } = useQuery(
    ["dashboardMonthPendencies", { transactionType: TransactionType.INCOME }],
    fetchMonthPendencies,
    {
      staleTime: 5 * 60 * 1000,
    }
  );

  async function fetchMonthPendencies({ queryKey }: QueryFunctionContext<any>) {
    const [_key, { transactionType }] = queryKey;
    const { fromDate, toDate } = getRangeDatesForCurrentMonth();
    const fromDateFormatted = q.Date(formatDateForFauna(fromDate));
    const toDateFormatted = q.Date(formatDateForFauna(toDate));

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
      toast({
        title: "Erro ao buscar dados.",
        description:
          "Ocorreu um erro ao buscar alguns dados para o dashboard. Por favor, tente recarregar a página.",
        status: "error",
      });
    }
  }

  return {
    pendentAmountToReceive,
    isLoadingPendentAmountToReceive,
    isErrorPendentAmountToReceive,
    pendentAmountToPay,
    isLoadingPendentAmountToPay,
    isErrorPendentAmountToPay,
  };
}
