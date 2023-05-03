import { useDisclosure } from "@chakra-ui/react";
import { useToast } from "@hooks/useToast";
import { queryClient } from "@services/queryClient";
import { supabase } from "@services/supabase";
import { TransactionRecurrence } from "@shared/enums/transactionRecurrence";
import { useState } from "react";
import { Transaction } from "./TransactionsTable.types";

export function useTransactionsTable() {
  const [warningMessage, setWarningMessage] = useState<string>();
  const [transactionToRemove, setTransactionToRemove] = useState<Transaction>();
  const confirmTransactionRemovalDisclosure = useDisclosure();
  const toast = useToast();

  function confirmTransactionRemoval(transaction: Transaction) {
    if (transaction.idOriginalTransaction) {
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
    });
    await queryClient.invalidateQueries();
  }

  async function removeUniqueTransaction(transaction: Transaction) {
    await removeTransactionById(transaction.id);
  }

  async function removeRecurrentTransaction(transaction: Transaction) {
    const { error, data: originalTransaction } = await supabase
      .from("transactions")
      .select("id")
      .eq("id", transaction.idOriginalTransaction)
      .limit(1)
      .single();

    if (error) {
      toast({
        title: "Erro ao remover transação.",
        description:
          "Houve um problema ao remover a transação selecionada e/ou outras transações vinculadas a ela. Por favor, tente novamente.",
        status: "error",
      });
      throw new Error("Erro ao remover transação.");
    }
    // only needed to remove the original transaction 'cause the installments are removed by database's cascade
    await removeTransactionById(originalTransaction.id);
  }

  async function removeTransactionById(id: number) {
    const { error } = await supabase.from("transactions").delete().eq("id", id);

    if (error) {
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
