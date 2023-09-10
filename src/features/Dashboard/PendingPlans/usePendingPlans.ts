import { supabase } from "@services/supabase"
import { useQuery } from "react-query"

export function usePendingPlans() {
  const {
    data: pendingPlans,
    isLoading: isPendingPlansLoading,
    isError: isPendingPlansError,
    refetch: refetchPendingPlans,
  } = useQuery("pendingPlans", fetchPendingPlans, {
    staleTime: 1000 * 60 * 10, // 10 minutes
  })

  async function fetchPendingPlans() {
    const { data, error } = await supabase
      .from("plans")
      .select("id, name, currentValue:current_value, plannedValue:planned_value")
      .is("finished", false)
      .order("due_date", {
        ascending: true,
        nullsFirst: false
      })
      .limit(3)

    if (error) {
      throw new Error("Erro ao obter os planos em andamento.")
    }
    return data
  }

  return {
    pendingPlans,
    isPendingPlansLoading,
    isPendingPlansError,
    refetchPendingPlans,
  }
}