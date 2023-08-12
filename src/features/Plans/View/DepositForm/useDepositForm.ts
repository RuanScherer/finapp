import { useToast } from "@hooks/useToast"
import { queryClient } from "@services/queryClient"
import { supabase } from "@services/supabase"
import { useMutation } from "react-query"
import { CreateDepositFormData } from "./DepositForm.types"

export function useDepositForm(planId: number) {
  const toast = useToast()

  const createDepositMutation = useMutation(createDeposit, {
    onSuccess: () => {
      queryClient.invalidateQueries("plans")
      toast({
        title: "Oba! Você adicionou um novo registro em seu plano.",
        status: "success",
      })
    },
    onError: () => {
      toast({
        title: "Ops! Ocorreu um erro ao adicionar o novo registro em seu plano.",
        status: "error",
      })
    }
  })

  async function createDeposit(data: CreateDepositFormData): Promise<void> {
    const { error } = await supabase.from("plan_deposits").insert({
      value: data.value,
      description: data.description,
      plan_id: planId,
    })

    if (error) throw new Error("Erro ao criar registro.")
  }

  return {
    isDepositing: createDepositMutation.isLoading,
    createDeposit: createDepositMutation.mutateAsync,
  }
}