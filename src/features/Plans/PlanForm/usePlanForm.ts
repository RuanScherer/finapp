import { useAuth } from "@contexts/AuthContext";
import { useToast } from "@hooks/useToast";
import { queryClient } from "@services/queryClient";
import { supabase } from "@services/supabase";
import { formatDateForDatabase } from "@shared/utils/formatDateForDatabase";
import { formatDateToUTC } from "@shared/utils/formatDateToUTC";
import { useMutation } from "react-query";
import { CreatePlanFormData } from "./PlanForm.types";

export function usePlanForm() {
  const { user } = useAuth();
  const toast = useToast();

  const createPlanMutation = useMutation(createPlan, {
    onSuccess: () => {
      queryClient.invalidateQueries("plans");
      toast({
        title: "Uhul! Seu plano foi criado com sucesso!",
        status: "success",
      });
    },
    onError: () => {
      toast({
        title: "Ops! Ocorreu um erro ao criar seu plano.",
        status: "error",
      });
    }
  })

  const editPlanMutation = useMutation(editPlan, {
    onSuccess: () => {
      queryClient.invalidateQueries("plans");
      toast({
        title: "Uhul! Seu plano foi alterado com sucesso!",
        status: "success",
      });
    },
    onError: () => {
      toast({
        title: "Ops! Ocorreu um erro ao alterar seu plano.",
        status: "error",
      });
    }
  })

  async function createPlan(data: CreatePlanFormData): Promise<void> {
    const formattedDueDate = formatDueDateForSaving(data.dueDate);

    const { error } = await supabase.from("plans").insert({
      name: data.name,
      planned_value: data.plannedValue,
      due_date: formattedDueDate,
      user_id: user!.id,
    })
    if (error) throw new Error("Erro ao criar plano.");
  }

  async function editPlan(data: CreatePlanFormData & { id: number }): Promise<void> {
    const formattedDueDate = formatDueDateForSaving(data.dueDate);

    const { error } = await supabase.from("plans").update({
      name: data.name,
      planned_value: data.plannedValue,
      due_date: formattedDueDate,
      user_id: user!.id,
    }).eq("id", data.id)
    if (error) throw new Error("Erro ao alterar plano.");
  }

  function formatDueDateForSaving(dueDate: string | Date | undefined) {
    if (!dueDate) return;

    if (typeof dueDate === "string") {
      const utcDueDate = formatDateToUTC(new Date(dueDate));
      return formatDateForDatabase(utcDueDate);
    }
    return formatDateForDatabase(dueDate);
  }

  return {
    createPlan: createPlanMutation.mutateAsync,
    editPlan: editPlanMutation.mutateAsync,
    isSavingPlan: createPlanMutation.isLoading || editPlanMutation.isLoading,
  }
}