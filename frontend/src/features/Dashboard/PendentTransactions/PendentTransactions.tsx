import { Heading, HStack, Skeleton, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { EmptyState } from "../../../components/EmptyState";
import { Card } from "../Card";
import { TransactionsTable } from "./TransactionsTable";
import { usePendentTransactions } from "./usePendentTransactions";

export function PendentTransactions() {
  const { lastPendentTransactions } = usePendentTransactions();
  
  return (
    <Card>
      <HStack justifyContent="space-between" alignItems="center" mb="2">
        <Heading fontSize="xl" fontWeight="semibold">
          Pendências
        </Heading>

        {lastPendentTransactions?.length && (
          <Link to="/transactions">
            <Text
              fontSize="sm"
              color="primary.500"
              cursor="pointer"
              textAlign="right"
              mt="2"
              _hover={{
                filter: "brightness(0.8)"
              }}
            >
              Ver tudo
            </Text>
          </Link>
        )}
      </HStack>

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
    </Card>
  )
}
