import { Box, Center, Heading, Spinner, theme } from "@chakra-ui/react";
import { Doughnut } from "react-chartjs-2";
import { EmptyState } from "../../../components/EmptyState";
import { Card } from "../Card";
import { useTransactionsPerCategory } from "./useTransactionsPerCategory";

const colors = theme.colors

export function TransactionsPerCategory() {
  const { transactionsPerCategory } = useTransactionsPerCategory()

  return (
    <Card>
      <Heading fontSize="xl" fontWeight="semibold">
        Despesas por categoria
      </Heading>

      <Box w="full" mt="2">
        {transactionsPerCategory ? (
          transactionsPerCategory.length > 0 ? (
            <Center>
              <Doughnut
                data={{
                  labels: transactionsPerCategory.map(item => item.categoryName),
                  datasets: [{
                    data: transactionsPerCategory.map(item => item.count),
                    backgroundColor: [
                      colors.green[400],
                      colors.teal[400],
                      colors.blue[400],
                      colors.cyan[400],
                      colors.purple[400],
                      colors.pink[400]
                    ],
                    hoverBackgroundColor: [
                      colors.green[500],
                      colors.teal[500],
                      colors.blue[500],
                      colors.cyan[500],
                      colors.purple[500],
                      colors.pink[500]
                    ],
                    borderRadius: 6,
                  }]
                }}
              />
            </Center>
          ) : (
            <EmptyState>
              Não existem transações neste mês para base de cálculo.
            </EmptyState>
          )
        ) : (
          <Center>
            <Spinner
              color="primary.500"
              size="xl"
              mt="2"
            />
          </Center>
        )}
      </Box>
    </Card>
  )
}
