import { useAuth } from "@contexts/AuthContext";
import { useToast } from "@hooks/useToast";
import { supabase } from "@services/supabase";
import { getTransactionType } from "@shared/enums/transactionType";
import { getRangeDatesForCurrentMonth } from "@shared/utils/getRangeDates";
import { useQuery } from "react-query";

export function usePendingTransactions() {
  const { user } = useAuth();
  const toast = useToast();

  const { data: lastPendingTransactions } = useQuery(
    "dashboardPendingTransactions",
    fetchPendingTransactions,
    {
      staleTime: 10 * 60 * 1000, // 10 minutes
    }
  );

  async function fetchPendingTransactions() {
    const { fromDate, toDate } = getRangeDatesForCurrentMonth();

    const { error, data } = await supabase.rpc(
      "get_month_pending_transactions",
      {
        p_user_id: user!.id,
        p_from_date: fromDate.toISOString(),
        p_to_date: toDate.toISOString(),
      }
    );

    if (error) {
      toast({
        title: "Erro ao buscar dados.",
        description:
          "Ocorreu um erro ao buscar alguns dados para o dashboard. Por favor, tente recarregar a página.",
        status: "error",
      });
      throw new Error("Erro ao buscar transacões pendentes para o dashboard.");
    }
    return data.map((transaction) => ({
      ...transaction,
      type: getTransactionType(transaction.type),
    }));
  }

  return { lastPendingTransactions };
}
