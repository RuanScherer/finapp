import { useToast } from "@hooks/useToast"
import { queryClient } from "@services/queryClient"
import { supabase } from "@services/supabase"
import { useMutation } from "react-query"
import { UsePlanDepositItemParams } from "./PlanDepositItem.types"

export function usePlanDepositItem(params: UsePlanDepositItemParams) {
  const toast = useToast()

  const removeDepositMutation = useMutation(removeDeposit, {
    onSuccess: () => {
      queryClient.invalidateQueries("plans")
      queryClient.invalidateQueries(["plan", String(params.planId)])

      toast({
        title: "O registro removido com sucesso!",
        status: "success"
      })
    },
    onError: () => {
      toast({
        title: "Ops!",
        description: "Ocorreu um erro ao remover o registro. Tente novamente mais tarde.",
        status: "error"
      })
    }
  })

  async function removeDeposit() {
    const { error } = await supabase
      .from("plan_deposits")
      .delete()
      .eq("id", params.depositId)

    if (error) throw new Error("Erro ao remover o depósito.")
  }

  return { removeDeposit: removeDepositMutation.mutateAsync }
}