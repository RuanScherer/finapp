import { TransactionRecurrence } from "@shared/enums/transactionRecurrence";
import { TransactionStatus } from "@shared/enums/transactionStatus";
import { TransactionType } from "@shared/enums/transactionType";

export interface TransactionsViewContextData {
  transactions?: Array<Transaction>;
  getTransactionsViewByMonth: ({
    fromDate,
    toDate,
  }: GetTransactionsViewByMonthParams) => void;
  updateTransactionStatusByRefId: ({
    refId,
    status,
  }: UpdateTransactionStatusByRefIdParams) => Promise<void>;
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

export interface UpdateTransactionStatusByRefIdParams {
  refId: string;
  status: TransactionStatus;
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
  ref: DocumentRef;
  transactionRefId?: string;
}

interface DocumentRef {
  id: string;
}