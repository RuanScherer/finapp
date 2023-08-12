import { Box, Center, Heading, Spinner, theme } from "@chakra-ui/react";
import { Card } from "@components/Card";
import { EmptyState } from "@components/EmptyState";
import {
  getTransactionRecurrence,
  getTransactionRecurrenceLabel
} from "@shared/enums/transactionRecurrence";
import { getTransactionTypeLabel } from "@shared/enums/transactionType";
import { Doughnut } from "react-chartjs-2";
import { TransactionsCountByRecurrenceProps } from "./TransactionsCountByRecurrence.types";
import { useTransactionsCountByRecurrence } from "./useTransactionsCountByRecurrence";

const colors = theme.colors;

export function TransactionsCountByRecurrence(
  props: TransactionsCountByRecurrenceProps
) {
  const { transactionsCountByRecurrence } = useTransactionsCountByRecurrence(
    props.transactionType
  );

  return (
    <Box mt={2}>
      <Heading fontSize="lg" fontWeight="medium" mb={4}>
        {getTransactionTypeLabel(props.transactionType)}s por recorrência
      </Heading>

      {transactionsCountByRecurrence ? (
        transactionsCountByRecurrence.length > 0 ? (
          <Card>
            <Box mx="auto" w="fit-content">
              <Doughnut
                options={{
                  plugins: {
                    tooltip: {
                      displayColors: false,
                    },
                  },
                }}
                data={{
                  labels: transactionsCountByRecurrence.map((item) =>
                    getTransactionRecurrenceLabel(
                      getTransactionRecurrence(item.recurrence)
                    )
                  ),
                  datasets: [
                    {
                      data: transactionsCountByRecurrence.map(
                        (item) => item.count
                      ),
                      label: "Quantidade",
                      backgroundColor: [
                        colors.green[300],
                        colors.teal[300],
                        colors.blue[300],
                      ],
                      hoverBackgroundColor: [
                        colors.green[400],
                        colors.teal[400],
                        colors.blue[400],
                      ],
                      hoverBorderWidth: 0,
                      borderRadius: 6,
                    },
                  ],
                }}
              />
            </Box>
          </Card>
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
  );
}
