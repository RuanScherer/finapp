import { List } from "@chakra-ui/react";
import { TransactionCard } from "./TransactionCard";
import { TransactionsListProps } from "./TransactionsList.types";

export function TransactionsList(props: TransactionsListProps) {
  return (
    <List flexDirection="column">
      {props.transactions.map((transaction) => (
        <TransactionCard transaction={transaction} key={transaction.id} />
      ))}
    </List>
  )
}