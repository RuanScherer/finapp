import { List, ListItem } from "@chakra-ui/react";
import { getTransactionIdToNavigate } from "@shared/utils/transactionUtils";
import { useNavigate } from "react-router-dom";
import { TransactionCard } from "./TransactionCard";
import { Transaction, TransactionsListProps } from "./TransactionsList.types";

export function TransactionsList(props: TransactionsListProps) {
  const navigate = useNavigate();

  function handleSelectTransaction(transaction: Transaction) {
    const id = getTransactionIdToNavigate(transaction);
    navigate(`/transaction/${id}`);
  }

  return (
    <List flexDirection="column">
      {props.transactions.map((transaction, index) => (
        <ListItem
          w="full"
          borderBottomWidth={index < props.transactions.length - 1 ? 1 : 0}
          borderBottomColor="gray.200"
          p={3}
          cursor="pointer"
          onClick={() => handleSelectTransaction(transaction)}
          key={transaction.id}
        >
          <TransactionCard transaction={transaction} />
        </ListItem>
      ))}
    </List>
  )
}