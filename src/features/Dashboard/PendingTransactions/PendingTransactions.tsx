import { Skeleton } from "@chakra-ui/react";
import { Card } from "@components/Card";
import { EmptyState } from "@components/EmptyState";
import { Link } from "@components/Link";
import { Link as ReactRouterLink } from "react-router-dom";
import { TransactionsTable } from "./TransactionsTable";
import { usePendingTransactions } from "./usePendingTransactions";

export function PendingTransactions() {
  const { lastPendingTransactions } = usePendingTransactions();

  return (
    <Card>
      {lastPendingTransactions ? (
        lastPendingTransactions.length > 0 ? (
          <TransactionsTable transactions={lastPendingTransactions} />
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

      {!!lastPendingTransactions?.length && (
        <Link mt={4}>
          <ReactRouterLink to="/transactions">Ver tudo</ReactRouterLink>
        </Link>
      )}
    </Card>
  );
}
