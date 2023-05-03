import { useAuth } from "@contexts/AuthContext";
import { useToast } from "@hooks/useToast";
import { supabase } from "@services/supabase";
import { TransactionType } from "@shared/enums/transactionType";
import { getRangeDatesForCurrentMonth } from "@shared/utils/getRangeDates";
import { QueryFunctionContext, useQuery } from "react-query";

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

  const { data: pendingAmount } = useQuery(
    ["dashboardMonthPendencies", type],
    fetchMonthPendencies,
    {
      staleTime: 5 * 60 * 1000,
    }
  );

  async function fecthMonthStat({ queryKey }: QueryFunctionContext<any>) {
    const [_key, transactionType] = queryKey;
    const { fromDate, toDate } = getRangeDatesForCurrentMonth();

    const { error, data } = await supabase.rpc("get_month_balance", {
      p_user_id: user!.id,
      p_type: transactionType,
      p_from_date: fromDate.toISOString(),
      p_to_date: toDate.toISOString(),
    });

    if (error) {
      showErrorMessage();
      throw new Error("Erro ao obter dados para o dashboard");
    }
    return data;
  }

  async function fetchMonthPendencies({ queryKey }: QueryFunctionContext<any>) {
    const [_key, transactionType] = queryKey;
    const { fromDate, toDate } = getRangeDatesForCurrentMonth();

    const { error, data } = await supabase.rpc("get_month_pendencies", {
      p_user_id: user!.id,
      p_type: transactionType,
      p_from_date: fromDate.toISOString(),
      p_to_date: toDate.toISOString(),
    });

    if (error) {
      showErrorMessage();
      throw new Error("Erro ao obter dados para o dashboard");
    }
    return data;
  }

  function showErrorMessage() {
    toast({
      title: "Erro ao buscar dados.",
      description:
        "Ocorreu um erro ao buscar alguns dados para o dashboard. Por favor, tente recarregar a página.",
      status: "error",
    });
  }

  return { amount, pendingAmount };
}
