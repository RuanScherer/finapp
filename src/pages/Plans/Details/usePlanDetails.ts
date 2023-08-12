import { supabase } from "@services/supabase"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"

export function usePlanDetails() {
  const { planId } = useParams()

  const {
    data: plan,
    isLoading: isPlanLoading,
    isError: isPlanError,
    refetch: refetchPlan
  } = useQuery(["plan", planId], fetchPlan, {
    staleTime: 1000 * 60 * 5
  })

  async function fetchPlan() {
    const { data, error } = await supabase
      .from("plans")
      .select("id, name, plannedValue:planned_value, currentValue:current_value, dueDate:due_date")
      .eq("id", planId)
      .limit(1)
      .single()

    if (error) throw new Error("Não foi possível carregar o plano.")
    return {
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined
    }
  }

  return {
    plan,
    isPlanLoading,
    isPlanError,
    refetchPlan
    // depositHistory
  }
}