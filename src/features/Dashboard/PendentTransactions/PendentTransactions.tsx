import { Skeleton, Text } from "@chakra-ui/react";
import { Card } from "@components/Card";
import { EmptyState } from "@components/EmptyState";
import { Link } from "react-router-dom";
import { TransactionsTable } from "./TransactionsTable";
import { usePendentTransactions } from "./usePendentTransactions";

export function PendentTransactions() {
  const { lastPendentTransactions } = usePendentTransactions();

  return (
    <Card>
      {lastPendentTransactions ? (
        lastPendentTransactions.length > 0 ? (
          <TransactionsTable transactions={lastPendentTransactions} />
        ) : (
          <EmptyState>
            Não existem transações pendentes para serem mostradas.
          </EmptyState>
        )
      ) : (
        <>
          <Skeleton h="20px" />
          <Skeleton h="20px" mt="2" />
          <Skeleton h="20px" mt="2" />
        </>
      )}

      {!!lastPendentTransactions?.length && (
        <Text
          fontSize="sm"
          color="primary.500"
          cursor="pointer"
          textAlign="center"
          w="fit-content"
          mx="auto"
          mt="4"
          _hover={{
            filter: "brightness(0.8)",
          }}
        >
          <Link to="/transactions">Ver tudo</Link>
        </Text>
      )}
    </Card>
  );
}
