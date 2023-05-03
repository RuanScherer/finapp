import { TransactionRecurrence } from "@shared/enums/transactionRecurrence";
import { TransactionStatus } from "@shared/enums/transactionStatus";
import { TransactionType } from "@shared/enums/transactionType";

export interface TransactionsViewContextData {
  transactions?: Array<Transaction>;
  getTransactionsViewByMonth: (
    params: GetTransactionsViewByMonthParams
  ) => void;
  updateTransactionStatusById: (
    params: UpdateTransactionStatusByIdParams
  ) => Promise<void>;
  refreshTransactionsViewByMonth: () => Promise<void>;
  transactionsQueryDates: {
    fromDate: Date;
    toDate: Date;
  };
}

export interface TransactionsViewContextProviderProps {
  children: React.ReactNode;
}

export interface GetTransactionsViewByMonthParams {
  fromDate: Date;
  toDate: Date;
}

export interface GetTransactionsViewByMonthReturn {
  data: Array<Transaction>;
}

export interface UpdateTransactionStatusByIdParams {
  id: number;
  status: TransactionStatus;
}

export interface Transaction {
  id: number;
  dueDate: Date | string;
  recurrence: TransactionRecurrence;
  status: TransactionStatus;
  type: TransactionType;
  paymentMethod: string;
  category: string;
  amount: number;
  name: string;
  idOriginalTransaction?: number;
  installmentAmount?: number;
  installmentNumber?: number;
}
