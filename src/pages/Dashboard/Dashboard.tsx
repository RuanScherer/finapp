import { Grid, GridItem, Heading } from "@chakra-ui/react";
import { MonthStat } from "@features/Dashboard/MonthStat";
import { PendentTransactions } from "@features/Dashboard/PendentTransactions";
import { monthsName } from "@shared/constants/monthsName";
import { TransactionType } from "@shared/enums/transactionType";

export function Dashboard() {
  return (
    <Grid
      templateColumns="repeat(24, 1fr)"
      rowGap={4}
      columnGap={[0, 4, 4]}
      my={2}
    >
      {/* === Visão geral === */}
      <GridItem colSpan={24}>
        <Heading fontSize="xl" fontWeight="semibold" w="full">
          Visão geral de {monthsName[new Date().getMonth()]}
        </Heading>
      </GridItem>

      <GridItem colSpan={[24, 12, 10, 8, 6]}>
        <MonthStat type={TransactionType.INCOME} />
      </GridItem>

      <GridItem colSpan={[24, 12, 10, 8, 6]}>
        <MonthStat type={TransactionType.OUTCOME} />
      </GridItem>

      {/* === Pendências === */}
      <GridItem colSpan={24} mt={2}>
        <Heading fontSize="xl" fontWeight="semibold" w="full">
          Pendências
        </Heading>
      </GridItem>

      <GridItem colSpan={24}>
        <PendentTransactions />
      </GridItem>
    </Grid>
  );
}
