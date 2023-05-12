import {
  Box,
  Center,
  Heading,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Card } from "@components/Card";
import { EmptyState } from "@components/EmptyState";
import { getTransactionTypeLabel } from "@shared/enums/transactionType";
import { PendingInstallmentRow } from "./PendingInstallmentRow";
import { PendingInstallmentsByTransactionProps } from "./PendingInstallmentsByTransaction.types";
import { usePendingInstallmentsByTransaction } from "./usePendingInstallmentsByTransaction";

export function PendingInstallmentsByTransaction(
  props: PendingInstallmentsByTransactionProps
) {
  const { pendingInstallmentsByTransaction } =
    usePendingInstallmentsByTransaction(props.transactionType);

  return (
    <Box mt={2}>
      <Heading fontSize="lg" fontWeight="medium">
        {getTransactionTypeLabel(props.transactionType)}s parceladas
      </Heading>

      <Card mt={4}>
        <Box w="full">
          {pendingInstallmentsByTransaction ? (
            pendingInstallmentsByTransaction.length > 0 ? (
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
                    {pendingInstallmentsByTransaction.map((item) => (
                      <PendingInstallmentRow
                        key={item.name}
                        installment={item}
                      />
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            ) : (
              <EmptyState>
                Não existem transações neste mês para base de cálculo.
              </EmptyState>
            )
          ) : (
            <Center>
              <Spinner color="primary.400" size="xl" mt="2" speed="1s" />
            </Center>
          )}
        </Box>
      </Card>
    </Box>
  );
}
