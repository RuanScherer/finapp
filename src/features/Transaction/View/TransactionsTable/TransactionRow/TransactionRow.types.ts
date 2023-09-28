import { Transaction } from "../TransactionsTable.types";

export interface TransactionRowProps {
  transaction: Transaction;
  onRemove: (transaction: Transaction) => void;
}
