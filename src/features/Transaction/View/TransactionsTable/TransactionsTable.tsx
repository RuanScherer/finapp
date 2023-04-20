import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { EmptyState } from "@components/EmptyState";
import { useTransactionsView } from "@contexts/TransactionsViewContext";
import { ConfirmTransactionRemovalModal } from "./ConfirmTransactionRemovalModal";
import { TransactionRow } from "./TransactionRow";
import { Transaction, TransactionsTableProps } from "./TransactionsTable.types";
import { useTransactionsTable } from "./useTransactionsTable";

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  const {
    confirmTransactionRemovalDisclosure,
    confirmTransactionRemoval,
    handleCloseConfirmTransactionRemovalModal,
    warningMessage,
    transactionToRemove,
    removeTransaction,
  } = useTransactionsTable();
  const { refreshTransactionsViewByMonth } = useTransactionsView();

  async function handleRemoveTransaction(transaction: Transaction) {
    await removeTransaction(transaction);
    await refreshTransactionsViewByMonth();
    handleCloseConfirmTransactionRemovalModal();
  }

  if (transactions.length === 0) {
    return (
      <EmptyState>
        Não existem transações pendentes para serem mostradas.
      </EmptyState>
    );
  }

  return (
    <>
      <TableContainer>
        <Table size={["sm", "sm", "md"]}>
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Tipo</Th>
              <Th>Forma de pagamento</Th>
              <Th>Categoria</Th>
              <Th>Valor</Th>
              <Th>Status</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((transaction) => (
              <TransactionRow
                transaction={transaction}
                onRemove={confirmTransactionRemoval}
                key={transaction.ref.id}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <ConfirmTransactionRemovalModal
        isOpen={confirmTransactionRemovalDisclosure.isOpen}
        onClose={handleCloseConfirmTransactionRemovalModal}
        onConfirm={() => handleRemoveTransaction(transactionToRemove!)}
        transactionToRemove={transactionToRemove}
        warningMessage={warningMessage}
      />
    </>
  );
}
