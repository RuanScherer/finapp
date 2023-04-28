import { TransactionRecurrence } from "@shared/enums/transactionRecurrence";
import { TransactionStatus } from "@shared/enums/transactionStatus";
import { TransactionType } from "@shared/enums/transactionType";

export interface TransactionsTableProps {
  transactions: Transaction[];
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

interface DocumentRef {
  id: string;
}

export interface GetTransactionByRefResult {
  ref: DocumentRef;
}

export interface GetTransactionsByTransactionRefIdResult {
  data: Array<DocumentRef>;
}
