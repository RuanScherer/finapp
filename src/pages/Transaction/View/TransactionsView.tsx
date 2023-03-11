import { Box, Heading, HStack, Input, Skeleton } from "@chakra-ui/react";
import { Container } from "@components/Container";
import { Header } from "@components/Header";
import { useTransactionsView } from "@contexts/TransactionsViewContext";
import { Card } from "@features/Dashboard/Card";
import { TransactionsTable } from "@features/Transaction/View/TransactionsTable";
import { monthsName } from "@shared/constants/monthsName";

export function TransactionsView() {
  const { transactions } = useTransactionsView();

  return (
    <Container>
      <Box mb="4">
        <Header />
      </Box>

      <HStack alignItems="center" justifyContent="end" my="4">
        <Heading fontSize="2xl" fontWeight="semibold" w="full">
          Transações de {monthsName[new Date().getMonth()]}
        </Heading>

        <Input type="date" w="fit-content" />
      </HStack>

      <Card>
        {transactions ? (
          <TransactionsTable transactions={transactions} />
        ) : (
          <>
            {Array(10)
              .fill(undefined)
              .map((_, index) => (
                <Skeleton
                  h="40px"
                  startColor="gray.100"
                  endColor="gray.300"
                  mt={index === 0 ? 0 : 2}
                  key={index}
                />
              ))}
          </>
        )}
      </Card>
    </Container>
  );
}
