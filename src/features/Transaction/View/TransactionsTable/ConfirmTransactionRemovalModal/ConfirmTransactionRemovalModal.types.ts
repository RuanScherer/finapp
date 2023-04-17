import { Transaction } from "../TransactionsTable.types";

export interface ConfirmTransactionRemovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void
  warningMessage?: string;
  transactionToRemove?: Transaction;
}