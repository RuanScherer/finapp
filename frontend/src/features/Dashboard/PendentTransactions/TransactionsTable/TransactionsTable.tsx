import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { Transaction } from "../PendentTransactions.types";
import { TransactionRow } from "../TransactionRow";

interface TransactionsTableProps {
  transactions: Transaction[]
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  return (
    <TableContainer>
      <Table size="sm" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Categoria</Th>
            <Th></Th>
            <Th>Valor</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.map(transaction => (
            <TransactionRow transaction={transaction} key={transaction.ref.id} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}