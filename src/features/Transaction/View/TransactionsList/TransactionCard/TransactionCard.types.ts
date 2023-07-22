import { TransactionStatus } from "@shared/enums/transactionStatus";
import { TransactionType } from "@shared/enums/transactionType";

export interface TransactionCardProps {
  transaction: Transaction;
}

export interface Transaction {
  status: TransactionStatus;
  type: TransactionType;
  amount: number;
  name: string;
  id: number;
  idOriginalTransaction?: number;
  installmentAmount?: number;
  installmentNumber?: number;
}
