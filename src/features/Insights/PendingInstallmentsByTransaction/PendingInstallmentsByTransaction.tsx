import {
  Box,
  Center, Heading, Spinner
} from "@chakra-ui/react";
import { Card } from "@components/Card";
import { EmptyState } from "@components/EmptyState";
import { getTransactionTypeLabel } from "@shared/enums/transactionType";
import { PendingInstallmentsByTransactionProps } from "./PendingInstallmentsByTransaction.types";
import { PendingInstallmentsList } from "./PendingInstallmentsList";
import { PendingInstallmentsTable } from "./PendingInstallmentsTable";
import { usePendingInstallmentsByTransaction } from "./usePendingInstallmentsByTransaction";

export function PendingInstallmentsByTransaction(
  props: PendingInstallmentsByTransactionProps
) {
  const { pendingInstallmentsByTransaction } =
    usePendingInstallmentsByTransaction(props.transactionType);

  return (
    <Box mt={2}>
      <Heading fontSize="lg" fontWeight="medium" mb={4}>
        {getTransactionTypeLabel(props.transactionType)}s parceladas
      </Heading>

      {!pendingInstallmentsByTransaction && (
        <Card>
          <Center>
            <Spinner color="primary.500" speed="1s" />
          </Center>
        </Card>
      )}

      {(pendingInstallmentsByTransaction && pendingInstallmentsByTransaction.length === 0) && (
        <Card>
          <EmptyState>
            Não existem transações neste mês para base de cálculo.
          </EmptyState>
        </Card>
      )}

      {(pendingInstallmentsByTransaction && pendingInstallmentsByTransaction.length > 0) && (
        <>
          <Card display={["none", "none", "block"]}>
            <PendingInstallmentsTable pendingInstallments={pendingInstallmentsByTransaction} />
          </Card>

          <Card display={["block", "block", "none"]} p={0}>
            <PendingInstallmentsList pendingInstallments={pendingInstallmentsByTransaction} />
          </Card>
        </>
      )}
    </Box>
  );
}
