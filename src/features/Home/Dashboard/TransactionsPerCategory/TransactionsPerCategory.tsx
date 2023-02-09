import { Box, Heading, theme } from "@chakra-ui/react";
import { Doughnut } from "react-chartjs-2";
import { Card } from "../Card";

const colors = theme.colors

export function TransactionsPerCategory() {
  return (
    <Card>
      <Heading fontSize="xl" fontWeight="semibold">
        Divisão por categoria
      </Heading>

      <Box mt="2">
        <Doughnut
          data={{
            labels: ['Alimentação', 'Educação', 'Lazer', 'Moradia', 'Transporte', 'Outros'],
            datasets: [{
              data: [100, 200, 300, 400, 500, 600],
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
      </Box>
    </Card>
  )
}
