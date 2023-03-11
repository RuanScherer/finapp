import { TransactionRecurrence } from "@shared/enums/transactionRecurrence";
import { TransactionsStatus } from "@shared/enums/transactionStatus";
import { TransactionType } from "@shared/enums/transactionType";

export interface TransactionsTableProps {
  transactions: Transaction[];
}

interface Transaction {
  dueDate: {
    date: Date;
  };
  recurrence: TransactionRecurrence;
  status: TransactionsStatus;
  type: TransactionType;
  paymentMethod: string;
  category: string;
  amount: number;
  name: string;
  ref: {
    id: string;
  };
}
