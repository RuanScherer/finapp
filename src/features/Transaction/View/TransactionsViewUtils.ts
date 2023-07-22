import { TransactionRecurrence } from "@shared/enums/transactionRecurrence";
import { TransactionStatus } from "@shared/enums/transactionStatus";
import { TransactionType } from "@shared/enums/transactionType";

interface Transaction {
  dueDate: Date | string;
  recurrence: TransactionRecurrence;
  status: TransactionStatus;
  type: TransactionType;
  paymentMethod: string;
  category: string;
  amount: number;
  name: string;
  id: number;
  idOriginalTransaction?: number;
  installmentAmount?: number;
  installmentNumber?: number;
}

export function getTransactionName(transaction: Pick<Transaction, 'name' | 'installmentAmount' | 'installmentNumber'>) {
  let name = transaction.name;

  if (transaction.installmentNumber && transaction.installmentAmount) {
    name += ` (${transaction.installmentNumber}/${transaction.installmentAmount})`;
  }
  return name;
}

export function getTransactionIdToNavigate(transaction: Pick<Transaction, 'idOriginalTransaction' | 'id'>) {
  return transaction.idOriginalTransaction || transaction.id;
}