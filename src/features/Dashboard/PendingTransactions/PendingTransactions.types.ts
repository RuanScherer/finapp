import { TransactionType } from "@shared/enums/transactionType";

export interface Transaction {
  id: number;
  name: string;
  amount: number;
  category: string;
  type: TransactionType;
}
