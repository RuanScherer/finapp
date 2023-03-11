import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { EmptyState } from "@components/EmptyState";
import { TransactionRow } from "./TransactionRow";
import { TransactionsTableProps } from "./TransactionsTable.types";

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  if (transactions.length === 0) {
    return (
      <EmptyState>
        Não existem transações pendentes para serem mostradas.
      </EmptyState>
    );
  }

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Tipo</Th>
            <Th>Forma de pagamento</Th>
            <Th>Valor</Th>
            <Th>Status</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.map((transaction) => (
            <TransactionRow
              transaction={transaction}
              key={transaction.ref.id}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
