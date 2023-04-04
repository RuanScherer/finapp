import { TransactionRecurrence } from "@shared/enums/transactionRecurrence";
import { TransactionStatus } from "@shared/enums/transactionStatus";
import { TransactionType } from "@shared/enums/transactionType";

export interface NewTransactionFormData {
  name: string;
  amount: number;
  category: string;
  paymentMethod: string;
  type: TransactionType;
  status: TransactionStatus;
  recurrence: TransactionRecurrence;
  dueDate: Date;
  installmentAmount?: number;
}

export type FaunaDBTransaction = {
  ref: {
    id: string;
  };
  data: NewTransactionFormData & {
    userId: string;
  };
};
