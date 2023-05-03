import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { Transaction } from "../PendingTransactions.types";
import { TransactionRow } from "../TransactionRow";

interface TransactionsTableProps {
  transactions: Transaction[];
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  return (
    <TableContainer>
      <Table colorScheme="gray" size={["sm", "sm", "md"]}>
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Categoria</Th>
            <Th>Tipo</Th>
            <Th>Valor</Th>
          </Tr>
        </Thead>

        <Tbody>
          {transactions.map((transaction) => (
            <TransactionRow transaction={transaction} key={transaction.id} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
