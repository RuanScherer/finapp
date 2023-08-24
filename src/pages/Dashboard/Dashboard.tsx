import { Grid, GridItem, Heading, SimpleGrid } from "@chakra-ui/react";
import { Card } from "@components/Card";
import { MonthStat } from "@features/Dashboard/MonthStat";
import { PendingPlans } from "@features/Dashboard/PendingPlans";
import { PendingTransactions } from "@features/Dashboard/PendingTransactions";
import { monthsName } from "@shared/constants/monthsName";
import { TransactionType } from "@shared/enums/transactionType";

export function Dashboard() {
  return (
    <Grid
      templateColumns="repeat(24, 1fr)"
      gap={5}
      my={1}
    >
      <GridItem colSpan={[24, 24, 15]} h="fit-content">
        <Grid templateColumns="repeat(24, 1fr)" gap={5}>
          {/* === Visão geral === */}
          <GridItem colSpan={24}>
            <Card p={[3, 4]}>
              <Heading fontSize={["lg", "xl"]} fontWeight="medium" w="full">
                Visão geral de {monthsName[new Date().getMonth()]}
              </Heading>

              <SimpleGrid columns={2} gap={4} mt={3}>
                <MonthStat type={TransactionType.INCOME} />
                <MonthStat type={TransactionType.OUTCOME} />
              </SimpleGrid>
            </Card>
          </GridItem>

          {/* === Pendências === */}
          <GridItem colSpan={24}>
            <Card p={[3, 4]}>
              <Heading fontSize={["lg", "xl"]} fontWeight="medium" w="full" mb={3}>
                Pendências
              </Heading>

              <PendingTransactions />
            </Card>
          </GridItem>
        </Grid>
      </GridItem>

      {/* === Seus planos === */}
      <GridItem colSpan={[24, 24, 9]} h="fit-content">
        <Card p={[3, 4]}>
          <Heading fontSize={["lg", "xl"]} fontWeight="medium" w="full" mb={3}>
            Planos em andamento
          </Heading>

          <PendingPlans />
        </Card>
      </GridItem>
    </Grid>
  );
}
