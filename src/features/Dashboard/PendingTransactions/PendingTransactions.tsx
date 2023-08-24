import { Box, Center, Spinner } from "@chakra-ui/react";
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
      <Center>
        <Spinner color="primary.500" speed="1s" />
      </Center>
    );
  }

  if (!lastPendingTransactions?.length) {
    return (
      <EmptyState>
        Não existem transações pendentes para serem mostradas.
      </EmptyState>
    );
  }

  return (
    <>
      <Box display={["none", "none", "block"]}>
        <TransactionsTable transactions={lastPendingTransactions} />

        {!!lastPendingTransactions?.length && (
          <Link mt={4}>
            <ReactRouterLink to="/transactions">Ver tudo</ReactRouterLink>
          </Link>
        )}
      </Box>

      <Box display={["block", "block", "none"]} p={0}>
        <TransactionsList transactions={lastPendingTransactions} />

        {!!lastPendingTransactions?.length && (
          <Link
            w="full"
            p={3}
            borderBottomRadius="xl"
            _hover={{ bgColor: "gray.50" }}
            transition=".3s"
          >
            <ReactRouterLink to="/transactions">Ver tudo</ReactRouterLink>
          </Link>
        )}
      </Box>
    </>
  );
}
