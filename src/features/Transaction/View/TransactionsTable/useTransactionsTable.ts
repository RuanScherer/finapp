import { useDisclosure } from "@chakra-ui/react";
import { useToast } from "@hooks/useToast";
import { fauna } from "@services/faunadb";
import { queryClient } from "@services/queryClient";
import { TransactionRecurrence } from "@shared/enums/transactionRecurrence";
import { query as q } from "faunadb";
import { useState } from "react";
import { GetTransactionByRefResult, GetTransactionsByTransactionRefIdResult, Transaction } from "./TransactionsTable.types";

export function useTransactionsTable() {
  const [warningMessage, setWarningMessage] = useState<string>();
  const [transactionToRemove, setTransactionToRemove] = useState<Transaction>();
  const confirmTransactionRemovalDisclosure = useDisclosure();
  const toast = useToast();

  function confirmTransactionRemoval(transaction: Transaction) {
    if (transaction.transactionRefId) {
      if (transaction.recurrence === TransactionRecurrence.INSTALLMENT) {
        setWarningMessage(
          "Essa é uma parcela de uma transação. Se excluí-la, todas as parcelas da mesma transação serão excluídas também."
        );
      }

      if (transaction.recurrence === TransactionRecurrence.FIXED) {
        setWarningMessage(
          "Essa é uma transação fixa. Se excluí-la, ela será removida dos outros meses também."
        );
      }
    } else {
      setWarningMessage(undefined);
    }

    setTransactionToRemove(transaction);
    confirmTransactionRemovalDisclosure.onOpen();
  }

  function handleCloseConfirmTransactionRemovalModal() {
    confirmTransactionRemovalDisclosure.onClose();
    setWarningMessage(undefined);
  }

  async function removeTransaction(transaction: Transaction) {
    if (transaction.recurrence === TransactionRecurrence.UNIQUE) {
      await removeUniqueTransaction(transaction);
    } else {
      await removeRecurrentTransaction(transaction);
    }

    toast({
      title: "Sucesso!",
      description: "A transação foi removida.",
      status: "success",
    })
    await queryClient.invalidateQueries();
  }

  async function removeUniqueTransaction(transaction: Transaction) {
    await removeTransactionsByRefId([transaction.ref.id])
  }

  async function removeRecurrentTransaction(transaction: Transaction) {
    try {
      const getTransactionByRefResult = await fauna.query<GetTransactionByRefResult>(
        q.Get(
          q.Ref(
            q.Collection("transactions"),
            transaction.transactionRefId!
          )
        )
      )

      const getTransactionsByTransactionRefIdResult = await fauna.query<GetTransactionsByTransactionRefIdResult>(
        q.Paginate(
          q.Match(
            q.Index("transactions_by_transaction_ref_id"),
            transaction.transactionRefId!
          )
        )
      )
      
      const transactionRefIds = [
        getTransactionByRefResult.ref.id,
        ...getTransactionsByTransactionRefIdResult.data.map((ref) => ref.id)
      ]
      await removeTransactionsByRefId(transactionRefIds)
    } catch {
      toast({
        title: "Erro ao remover transação.",
        description:
          "Houve um problema ao remover a transação selecionada e/ou outras transações vinculadas a ela. Por favor, tente novamente.",
        status: "error",
      });
      throw new Error("Erro ao remover transação.");
    }
  }

  async function removeTransactionsByRefId(refIds: Array<string>) {
    try {
      await fauna.query(
        q.Map(
          refIds,
          q.Lambda(
            "refId",
            q.Delete(
              q.Ref(
                q.Collection("transactions"),
                q.Var("refId")
              )
            )
          )
        )
      )
    } catch {
      toast({
        title: "Erro ao remover transação.",
        description:
          "Não foi possível remover a transação. Por favor, tente novamente.",
        status: "error",
      });
      throw new Error("Erro ao remover transação.");
    }
  }

  return {
    confirmTransactionRemovalDisclosure,
    warningMessage,
    transactionToRemove,
    confirmTransactionRemoval,
    handleCloseConfirmTransactionRemovalModal,
    removeTransaction,
  };
}
