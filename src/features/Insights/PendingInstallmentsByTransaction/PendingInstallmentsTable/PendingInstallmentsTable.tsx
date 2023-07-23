import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { PendingInstallmentRow } from "./PendingInstallmentRow";
import { PendingInstallmentsTableProps } from "./PendingInstallmentsTable.types";

export function PendingInstallmentsTable(props: PendingInstallmentsTableProps) {
  return (
    <TableContainer>
      <Table colorScheme="gray" size={["sm", "sm", "md"]}>
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Parcelas pendentes</Th>
            <Th>Total de parcelas</Th>
            <Th>Progresso</Th>
          </Tr>
        </Thead>

        <Tbody>
          {props.pendingInstallments.map((item) => (
            <PendingInstallmentRow
              key={item.name}
              installment={item}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}