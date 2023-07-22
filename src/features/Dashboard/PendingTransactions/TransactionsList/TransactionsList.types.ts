import { TransactionType } from "@shared/enums/transactionType";

export interface TransactionsListProps {
  transactions: Transaction[];
}

export interface Transaction {
  type: TransactionType;
  amount: number;
  name: string;
  id: number;
  idOriginalTransaction?: number;
  installmentAmount?: number;
  installmentNumber?: number;
}
