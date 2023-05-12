import { useAuth } from "@contexts/AuthContext";
import { useToast } from "@hooks/useToast";
import { supabase } from "@services/supabase";
import { TransactionType } from "@shared/enums/transactionType";
import { getRangeDatesForCurrentMonth } from "@shared/utils/getRangeDates";
import { QueryFunctionContext, useQuery } from "react-query";

export function useTransactionsCountByRecurrence(
  transactionType: TransactionType
) {
  const { user } = useAuth();
  const toast = useToast();

  const { data: transactionsCountByRecurrence } = useQuery(
    ["insightsTransactionsCountByRecurrence", transactionType],
    fetchTransactionsCountByRecurrence,
    {
      staleTime: 60 * 60 * 1000, // 1 hour
    }
  );

  async function fetchTransactionsCountByRecurrence({
    queryKey,
  }: QueryFunctionContext<any>) {
    const [_key, transactionType] = queryKey;
    const { fromDate, toDate } = getRangeDatesForCurrentMonth();

    const { error, data } = await supabase.rpc(
      "get_transactions_count_by_recurrence",
      {
        p_user_id: user!.id,
        p_from_date: fromDate.toISOString(),
        p_to_date: toDate.toISOString(),
        p_transaction_type: transactionType,
      }
    );

    if (error) {
      toast({
        title: "Erro ao buscar dados.",
        description:
          "Ocorreu um erro ao buscar a quantidade de transações por recorrência. Por favor, tente recarregar a página.",
        status: "error",
      });
      throw new Error(
        "Erro ao buscar quantidade de transações por recorrência."
      );
    }

    return data;
  }

  return { transactionsCountByRecurrence };
}
