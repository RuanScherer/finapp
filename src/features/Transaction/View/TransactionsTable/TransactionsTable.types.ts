import { TransactionRecurrence } from "@shared/enums/transactionRecurrence";
import { TransactionStatus } from "@shared/enums/transactionStatus";
import { TransactionType } from "@shared/enums/transactionType";

export interface TransactionsTableProps {
  transactions: Transaction[];
}

export interface Transaction {
  dueDate: Date | string;
  recurrence: TransactionRecurrence;
  status: TransactionStatus;
  type: TransactionType;
  paymentMethod: string;
  category: string;
  amount: number;
  name: string;
  id: number;
  idOriginalTransaction?: number;
  installmentAmount?: number;
  installmentNumber?: number;
}
