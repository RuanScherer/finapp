import { useToast } from "@hooks/useToast"
import { queryClient } from "@services/queryClient"
import { supabase } from "@services/supabase"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"

export function usePlanCard(planId?: number) {
  const navigate = useNavigate()
  const toast = useToast()

  const removePlanMutation = useMutation(removePlan, {
    onSuccess: () => {
      queryClient.invalidateQueries("plans")
      toast({
        title: "Oba!",
        description: "Deu tudo certo ao remover o plano.",
        status: "success",
      })
      navigate("/plans")
    },
    onError: (error) => {
      console.log(error)
      toast({
        title: "Vish!",
        description: "Algo deu errado enquanto tentávamos remover o plano. Tente novamente.",
        status: "error",
      })
    }
  })

  async function removePlan(): Promise<void> {
    const { error } = await supabase.from("plans").delete().match({ id: planId })

    if (error) throw new Error("Erro ao remover o plano.")
  }

  return {
    removePlan: removePlanMutation.mutateAsync,
  }
}