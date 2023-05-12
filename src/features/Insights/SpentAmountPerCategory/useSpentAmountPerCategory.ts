import { useAuth } from "@contexts/AuthContext";
import { useToast } from "@hooks/useToast";
import { supabase } from "@services/supabase";
import { getRangeDatesForCurrentMonth } from "@shared/utils/getRangeDates";
import { useQuery } from "react-query";

export function useSpentAmountPerCategory() {
  const { user } = useAuth();
  const toast = useToast();

  const { data: spentAmountPerCategory } = useQuery(
    "insightsSpentAmountPerCategory",
    fetchSpentAmountPerCategory,
    {
      staleTime: 60 * 60 * 1000, // 1 hour
    }
  );

  async function fetchSpentAmountPerCategory() {
    const { fromDate, toDate } = getRangeDatesForCurrentMonth();

    const { error, data } = await supabase.rpc("get_spent_amount_by_category", {
      p_user_id: user!.id,
      p_from_date: fromDate.toISOString(),
      p_to_date: toDate.toISOString(),
    });

    if (error) {
      toast({
        title: "Erro ao buscar dados.",
        description:
          "Ocorreu um erro ao buscar o valor gasto por categoria. Por favor, tente recarregar a página.",
        status: "error",
      });
      throw new Error("Erro ao buscar valor gasto por categoria.");
    }

    return data;
  }

  return { spentAmountPerCategory };
}
