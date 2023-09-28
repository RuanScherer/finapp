import { TransactionRecurrence } from "@shared/enums/transactionRecurrence";
import { TransactionStatus } from "@shared/enums/transactionStatus";
import { TransactionType } from "@shared/enums/transactionType";

export interface TransactionsListProps {
  transactions: Transaction[];
}

export interface Transaction {
  recurrence: TransactionRecurrence;
  status: TransactionStatus;
  type: TransactionType;
  amount: number;
  name: string;
  id: number;
  idOriginalTransaction?: number;
  installmentAmount?: number;
  installmentNumber?: number;
}
