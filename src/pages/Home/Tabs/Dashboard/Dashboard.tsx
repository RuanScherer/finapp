import { Grid, GridItem, Heading } from "@chakra-ui/react";
import { MonthPendencies } from "../../../../features/Home/Dashboard/MonthPendencies";
import { MonthStat } from "../../../../features/Home/Dashboard/MonthStat";
import { PendentTransactions } from "../../../../features/Home/Dashboard/PendentTransactions";
import { monthsName } from "../../../../shared/constants/monthsName";
import { TransactionType } from "../../../../shared/enums/transactionType";

export function Dashboard() {
  return (
    <>
      <Heading fontSize="xl" fontWeight="semibold" w="full" mb="4">
        Visão geral de {monthsName[new Date().getMonth()]}
      </Heading>

      <Grid
        templateRows="repeat(2, auto)"
        templateColumns="repeat(24, 1fr)"
        gap="4"
      >
        <GridItem colSpan={7}>
          <MonthStat type={TransactionType.DESPESA} />
        </GridItem>

        <GridItem colSpan={7}>
          <MonthStat type={TransactionType.RECEITA} />
        </GridItem>
        
        <GridItem colSpan={10}>
          <MonthPendencies />
        </GridItem>

        <GridItem colSpan={12}>
          <PendentTransactions />
        </GridItem>
      </Grid>
    </>
  )
}
