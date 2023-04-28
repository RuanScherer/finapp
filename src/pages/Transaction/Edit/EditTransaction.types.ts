import { TransactionRecurrence } from "@shared/enums/transactionRecurrence";
import { TransactionStatus } from "@shared/enums/transactionStatus";
import { TransactionType } from "@shared/enums/transactionType";

export interface EditTransactionFormData {
  name: string;
  amount: number;
  category: string;
  paymentMethod: string;
  type: TransactionType;
  status: TransactionStatus;
  installmentAmount?: number;
  installmentValue?: number;
}

export type Transaction = {
  ref: DocumentRef;
  data: {
    userId: string;
    name: string;
    amount: number;
    type: TransactionType;
    category: string;
    paymentMethod: string;
    recurrence: TransactionRecurrence;
    installmentAmount: number;
  };
};

export interface UpdateTransactionsByRefIdParams {
  originalTransactionRefId: string;
  installmentTransactionRefIds?: Array<string>;
  newData: EditTransactionFormData;
}

interface DocumentRef {
  id: string;
}

export interface GetTransactionsByTransactionRefIdResult {
  data: Array<DocumentRef>;
}
