import { TransactionRecurrence } from "@shared/enums/transactionRecurrence";
import { TransactionStatus } from "@shared/enums/transactionStatus";
import { TransactionType } from "@shared/enums/transactionType";

export interface TransactionRowProps {
  transaction: Transaction;
  onRemove: (transaction: Transaction) => void;
}

export interface Transaction {
  dueDate: {
    date: Date;
  };
  recurrence: TransactionRecurrence;
  status: TransactionStatus;
  type: TransactionType;
  paymentMethod: string;
  category: string;
  amount: number;
  name: string;
  ref: {
    id: string;
  };
  transactionRefId?: string;
  installmentAmount?: number;
  installmentOrder?: number;
}
