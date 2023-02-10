import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { MonthPendencies } from "../../features/Dashboard/MonthPendencies";
import { MonthStat } from "../../features/Dashboard/MonthStat";
import { PendentTransactions } from "../../features/Dashboard/PendentTransactions";
import { TransactionsPerCategory } from "../../features/Dashboard/TransactionsPerCategory";
import { monthsName } from "../../shared/constants/monthsName";
import { TransactionType } from "../../shared/enums/transactionType";

export function Dashboard() {
  return (
    <Container>
      <Box mb="4">
        <Header />
      </Box>

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

        <GridItem colSpan={14}>
          <PendentTransactions />
        </GridItem>

        <GridItem colSpan={10}>
          <TransactionsPerCategory />
        </GridItem>
      </Grid>
    </Container>
  )
}
