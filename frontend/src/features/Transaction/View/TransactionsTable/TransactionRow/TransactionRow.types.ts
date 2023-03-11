import { Transaction } from "@pages/Transaction/View/TransactionsView.types";

export interface TransactionRowProps {
  transaction: Transaction;
  onClick: (transaction: Transaction) => void;
}
