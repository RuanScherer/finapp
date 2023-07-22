import { Center, List, ListItem, Spinner } from "@chakra-ui/react";
import { EmptyState } from "@components/EmptyState";
import { useNavigate } from "react-router-dom";
import { getTransactionIdToNavigate } from "../TransactionsViewUtils";
import { TransactionCard } from "./TransactionCard";
import { Transaction, TransactionsListProps } from "./TransactionsList.types";

export function TransactionsList(props: TransactionsListProps) {
  const navigate = useNavigate();

  function handleSelectTransaction(transaction: Transaction) {
    const id = getTransactionIdToNavigate(transaction);
    navigate(`/transaction/${id}`);
  }

  if (props.transactions.length === 0) {
    return (
      <EmptyState>
        Não existem transações pendentes para serem mostradas.
      </EmptyState>
    );
  }

  return (
    <List display={["flex", "flex", "none"]} flexDirection="column">
      {props.transactions ? (
        props.transactions.map((transaction, index) => (
          <ListItem
            w="full"
            borderBottomWidth={index < props.transactions.length - 1 ? 1 : 0}
            borderBottomColor="gray.200"
            p={4}
            cursor="pointer"
            onClick={() => handleSelectTransaction(transaction)}
            key={transaction.id}
          >
            <TransactionCard transaction={transaction} />
          </ListItem>
        ))
      ) : (
        <Center p={4}>
          <Spinner color="primary.500" speed="1s" />
        </Center>
      )}
    </List>
  )
}