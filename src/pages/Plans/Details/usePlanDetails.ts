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

  const {
    data: depositHistory,
    isLoading: isDepositHistoryLoading,
    isError: isDepositHistoryError,
    refetch: refetchDepositHistory
  } = useQuery(["plan", planId, "deposits"], fetchDepositHistory, {
    staleTime: 1000 * 60 * 5
  })

  const hasDeposits = depositHistory && Object.keys(depositHistory).length > 0

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

  async function fetchDepositHistory() {
    const { data, error } = await supabase
      .from("plan_deposits")
      .select("id, value, description, createdAt:created_at, planId:plan_id")
      .eq("plan_id", planId)
      .order("created_at", { ascending: false })

    if (error) throw new Error("Não foi possível carregar os depositos do plano.")

    const depositHistory = data.reduce((acc, deposit) => {
      const date: string = new Date(deposit.createdAt).toISOString().split("T")[0]
      const depositHistory = acc[date] || []
      return {
        ...acc,
        [date]: [...depositHistory, deposit]
      }
    }, {} as { [date: string]: typeof data })
    return depositHistory
  }

  return {
    plan,
    isPlanLoading,
    isPlanError,
    refetchPlan,
    depositHistory,
    hasDeposits,
    isDepositHistoryLoading,
    isDepositHistoryError,
    refetchDepositHistory
  }
}