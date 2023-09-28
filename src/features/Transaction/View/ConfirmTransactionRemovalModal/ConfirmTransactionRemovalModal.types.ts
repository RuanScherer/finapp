import { TransactionRecurrence } from "@shared/enums/transactionRecurrence";

export interface ConfirmTransactionRemovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void
  warningMessage?: string;
  transactionToRemove?: {
    name: string;
  };
}

export interface BaseTransaction {
  recurrence: TransactionRecurrence;
  idOriginalTransaction?: number;
}
