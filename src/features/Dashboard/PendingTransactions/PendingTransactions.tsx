import { Center, Spinner } from "@chakra-ui/react";
import { Card } from "@components/Card";
import { EmptyState } from "@components/EmptyState";
import { Link } from "@components/Link";
import { Link as ReactRouterLink } from "react-router-dom";
import { TransactionsList } from "./TransactionsList";
import { TransactionsTable } from "./TransactionsTable";
import { usePendingTransactions } from "./usePendingTransactions";

export function PendingTransactions() {
  const { lastPendingTransactions } = usePendingTransactions();

  if (!lastPendingTransactions) {
    return (
      <Card>
        <Center>
          <Spinner color="primary.500" speed="1s" />
        </Center>
      </Card>
    );
  }

  if (!lastPendingTransactions?.length) {
    return (
      <Card>
        <EmptyState>
          Não existem transações pendentes para serem mostradas.
        </EmptyState>
      </Card>
    );
  }

  return (
    <>
      <Card display={["none", "none", "block"]}>
        <TransactionsTable transactions={lastPendingTransactions} />

        {!!lastPendingTransactions?.length && (
          <Link mt={4}>
            <ReactRouterLink to="/transactions">Ver tudo</ReactRouterLink>
          </Link>
        )}
      </Card>

      <Card display={["block", "block", "none"]} p={0}>
        <TransactionsList transactions={lastPendingTransactions} />

        {!!lastPendingTransactions?.length && (
          <Link
            w="full"
            p={4}
            borderBottomRadius="xl"
            _hover={{ bgColor: "gray.50" }}
            transition=".3s"
          >
            <ReactRouterLink to="/transactions">Ver tudo</ReactRouterLink>
          </Link>
        )}
      </Card>
    </>
  );
}
