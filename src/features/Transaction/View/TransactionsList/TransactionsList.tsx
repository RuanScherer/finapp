import { List, ListItem, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { TransactionCard } from "./TransactionCard";
import { TransactionDrawer } from "./TransactionDrawer";
import { Transaction, TransactionsListProps } from "./TransactionsList.types";

export function TransactionsList(props: TransactionsListProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>();
  const transactionDrawerDisclosure = useDisclosure();

  function handleSelectTransaction(transaction: Transaction) {
    setSelectedTransaction(transaction);
    transactionDrawerDisclosure.onOpen();
  }

  return (
    <>
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

      <TransactionDrawer
        isOpen={transactionDrawerDisclosure.isOpen}
        onClose={transactionDrawerDisclosure.onClose}
        transaction={selectedTransaction}
      />
    </>
  )
}