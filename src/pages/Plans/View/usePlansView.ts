import { useAuth } from "@contexts/AuthContext";
import { supabase } from "@services/supabase";
import { formatDateToUTC } from "@shared/utils/formatDateToUTC";
import { useQuery } from "react-query";

export function usePlansView() {
  const { user } = useAuth();

  const {
    data: plans,
    isError: isErrorLoadingPlans,
    isLoading: isLoadingPlans,
    refetch: refetchPlans,
  } = useQuery("plans", fetchPlans, {
    staleTime: 1000 * 60 * 10, // 10 minutes
  })

  const pendingPlans = plans?.filter((plan) => !plan.finished);
  const finishedPlans = plans?.filter((plan) => plan.finished);
  const hasPlans = !!plans?.length;
  const hasPendingPlans = !!pendingPlans?.length;
  const hasFinishedPlans = !!finishedPlans?.length;

  async function fetchPlans() {
    const { data, error } = await supabase
      .from("plans")
      .select("id, name, plannedValue:planned_value, currentValue:current_value, dueDate:due_date, finished")
      .eq("user_id", user!.id)
      .order("due_date", {
        ascending: true,
        nullsFirst: false
      })

    if (error) throw new Error("Erro ao buscar planos.");

    return data.map((plan) => ({
      ...plan,
      dueDate: plan.dueDate ? formatDateToUTC(new Date(plan.dueDate)) : null,
    }));
  }

  return {
    hasPlans,
    pendingPlans,
    hasPendingPlans,
    finishedPlans,
    hasFinishedPlans,
    isErrorLoadingPlans,
    isLoadingPlans,
    retryLoadPlans: refetchPlans,
  }
}