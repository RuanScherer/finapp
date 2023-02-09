import { Heading, HStack, Skeleton, Text } from "@chakra-ui/react";
import { Card } from "../Card";
import { TransactionRow } from "./TransactionRow";
import { usePendentTransactions } from "./usePendentTransactions";

export function PendentTransactions() {
  const { lastPendentTransactions } = usePendentTransactions();
  
  return (
    <Card>
      <HStack justifyContent="space-between" alignItems="center">
        <Heading fontSize="xl" fontWeight="semibold">
          Pendências
        </Heading>
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
      </HStack>

      {lastPendentTransactions ? (
        lastPendentTransactions.map(transaction => (
          <TransactionRow transaction={transaction} key={transaction.ref.id} />
        ))
      ) : (
        <>
          <Skeleton h="20px" mt="2" />
          <Skeleton h="20px" mt="2" />
          <Skeleton h="20px" mt="2" />
        </>
      )}
      
    </Card>
  )
}
