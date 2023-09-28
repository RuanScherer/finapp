import { useDisclosure } from "@chakra-ui/react";
import { TransactionRecurrence } from "@shared/enums/transactionRecurrence";
import { useState } from "react";
import { BaseTransaction } from "./ConfirmTransactionRemovalModal.types";

export function useConfirmTransactionRemoval<Transaction extends BaseTransaction>() {
  const [warningMessage, setWarningMessage] = useState<string>();
  const [transactionToRemove, setTransactionToRemove] = useState<Transaction>();
  const confirmTransactionRemovalDisclosure = useDisclosure();

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

  return {
    confirmTransactionRemovalDisclosure,
    warningMessage,
    transactionToRemove,
    confirmTransactionRemoval,
    handleCloseConfirmTransactionRemovalModal,
  }
}