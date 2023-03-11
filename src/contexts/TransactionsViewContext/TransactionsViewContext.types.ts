import { TransactionRecurrence } from "@shared/enums/transactionRecurrence";
import { TransactionStatus } from "@shared/enums/transactionStatus";
import { TransactionType } from "@shared/enums/transactionType";

export interface TransactionsViewContextData {
  transactions?: Array<Transaction>;
  updateTransactionStatusByRefId: (
    refId: string,
    status: TransactionStatus
  ) => Promise<void>;
}

export interface TransactionsViewContextProviderProps {
  children: React.ReactNode;
}

export interface GetTransactionsViewByMonthParams {
  userId: string;
  fromDate: Date;
  toDate: Date;
}

export interface GetTransactionsViewByMonthReturn {
  data: Array<Transaction>;
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
}
