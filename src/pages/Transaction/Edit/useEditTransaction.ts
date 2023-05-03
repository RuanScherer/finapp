import { useAuth } from "@contexts/AuthContext";
import { useToast } from "@hooks/useToast";
import { queryClient } from "@services/queryClient";
import { supabase } from "@services/supabase";
import { TransactionRecurrence } from "@shared/enums/transactionRecurrence";
import { toApplicationTransaction } from "@shared/mappers/transactionMapper";
import { QueryFunctionContext, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  EditTransactionFormData,
  UpdateTransactionsByIdParams,
} from "./EditTransaction.types";

export function useEditTransaction() {
  const { user } = useAuth();
  const toast = useToast();
  const { transactionId } = useParams();
  const navigate = useNavigate();

  const { data: transaction } = useQuery(
    ["transaction", transactionId],
    fetchTransaction,
    {
      staleTime: 60 * 60 * 1000, // 1 hour
      onError: () => navigate(-1),
    }
  );

  async function fetchTransaction(
    context: QueryFunctionContext<Array<string | undefined>>
  ) {
    const transactionId = context.queryKey[1];

    const { error, data: transaction } = await supabase
      .from("transactions")
      .select()
      .eq("id", transactionId)
      .limit(1)
      .single();

    if (error) {
      toast({
        title: "Erro ao obter transação.",
        description:
          "Não foi possível obter os dados da transação no momento. Por favor, tente novamente.",
        status: "error",
      });
      throw new Error("Erro ao obter transação.");
    }

    if (transaction?.user_id !== user!.id) {
      throw new Error("Você não tem permissão para editar esta transação.");
    }
    return toApplicationTransaction(transaction);
  }

  async function handleSave(data: EditTransactionFormData) {
    // fields to be used on update
    const formTransaction = {
      name: data.name,
      amount: data.amount,
      category: data.category,
      paymentMethod: data.paymentMethod,
      type: data.type,
      status: data.status,

      // used on update of recurrent transactions, not editable on UI
      installmentAmount: data.installmentAmount,
    };

    try {
      await updateTransactionsById({
        originalTransactionId: transaction!.id,
        newData: formTransaction,
        isRecurrent: transaction?.recurrence !== TransactionRecurrence.UNIQUE,
      });

      toast({
        title: "Sucesso!",
        description: "As alteracões foram salvas.",
        status: "success",
      });
      await queryClient.invalidateQueries();
      navigate(-1);
    } catch {
      toast({
        title: "Erro ao atualizar transação.",
        description:
          "Não foi possível atualizar a transação. Por favor, tente novamente.",
        status: "error",
      });
    }
  }

  async function updateTransactionsById({
    originalTransactionId,
    newData,
    isRecurrent,
  }: UpdateTransactionsByIdParams) {
    await persistTransaction(originalTransactionId, newData);

    if (isRecurrent) await persistInstallments(originalTransactionId, newData);
  }

  async function persistTransaction(
    originalTransactionId: number,
    newData: EditTransactionFormData
  ) {
    const { error } = await supabase
      .from("transactions")
      .update({
        name: newData.name,
        amount: newData.amount,
        category: newData.category,
        payment_method: newData.paymentMethod,
        type: newData.type,
        status: newData.status,
      })
      .eq("id", originalTransactionId);

    if (error) throw new Error("Erro ao atualizar transação.");
  }

  async function persistInstallments(
    idOriginalTransaction: number,
    newData: EditTransactionFormData
  ) {
    const { error } = await supabase
      .from("transactions")
      .update({
        name: newData.name,
        amount:
          transaction?.recurrence === TransactionRecurrence.INSTALLMENT
            ? newData.amount / newData.installmentAmount!
            : newData.amount,
        category: newData.category,
        payment_method: newData.paymentMethod,
        type: newData.type,
        status: newData.status,
      })
      .eq("id_original_transaction", idOriginalTransaction);

    if (error) throw new Error("Erro ao atualizar parcelas.");
  }

  return { transaction, handleSave };
}
