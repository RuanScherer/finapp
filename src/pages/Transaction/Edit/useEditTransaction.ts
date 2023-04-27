import { useAuth } from "@contexts/AuthContext";
import { useToast } from "@hooks/useToast";
import { fauna } from "@services/faunadb";
import { queryClient } from "@services/queryClient";
import { TransactionRecurrence } from "@shared/enums/transactionRecurrence";
import { query as q } from "faunadb";
import { QueryFunctionContext, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  EditTransactionFormData,
  Transaction,
  UpdateTransactionsByRefIdParams,
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

    const transaction = await fauna.query<Transaction>(
      q.Get(q.Ref(q.Collection("transactions"), transactionId))
    );

    if (transaction.data.recurrence !== TransactionRecurrence.UNIQUE) {
      toast({
        title: "Ops, calma aí!.",
        description:
          "Ainda não é possível editar transações fixas ou parceladas.",
        status: "error",
      });
      throw new Error(
        "Ainda não é possível editar transações fixas ou parceladas."
      );
    }

    if (transaction.data.userId !== user!.id) {
      toast({
        title: "Erro ao obter transação.",
        description: "Você não tem permissão para editar esta transação.",
        status: "error",
      });
      throw new Error("Você não tem permissão para editar esta transação.");
    }
    return transaction;
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
      installmentAmount: data.installmentAmount,
    };

    if (transaction?.data.recurrence === TransactionRecurrence.UNIQUE) {
      await updateUniqueTransaction(formTransaction);
    } else {
      await updateRecurrentTransaction(formTransaction);
    }

    toast({
      title: "Sucesso!",
      description: "As alteracões foram salvas.",
      status: "success",
    });
    await queryClient.invalidateQueries();
    navigate(-1);
  }

  async function updateUniqueTransaction(
    formTransaction: EditTransactionFormData
  ) {
    await updateTransactionsByRefId({
      originalTransactionRefId: transaction!.ref.id,
      newData: formTransaction,
    });
  }

  async function updateRecurrentTransaction(
    formTransaction: EditTransactionFormData
  ) {
    // TODO: implement
  }

  async function updateTransactionsByRefId({
    originalTransactionRefId,
    installmentTransactionRefIds,
    newData,
  }: UpdateTransactionsByRefIdParams) {
    try {
      await persistTransaction(originalTransactionRefId, newData);

      if (installmentTransactionRefIds) {
        // TODO: implement update of installments
      }
    } catch {
      toast({
        title: "Erro ao atualizar transação.",
        description:
          "Não foi possível atualizar a transação. Por favor, tente novamente.",
        status: "error",
      });
      throw new Error("Erro ao atualizar transação.");
    }
  }

  async function persistTransaction(
    originalTransactionRefId: string,
    newData: EditTransactionFormData
  ) {
    await fauna.query(
      q.Update(q.Ref(q.Collection("transactions"), originalTransactionRefId), {
        data: newData,
      })
    );
  }

  return { transaction, handleSave };
}
