import { Grid, GridItem, Heading } from "@chakra-ui/react";
import { PendingInstallmentsByTransaction } from "@features/Insights/PendingInstallmentsByTransaction";
import { SpentAmountPerCategory } from "@features/Insights/SpentAmountPerCategory";
import { TransactionsCountByRecurrence } from "@features/Insights/TransactionsCountByRecurrence";
import { monthsName } from "@shared/constants/monthsName";
import { TransactionType } from "@shared/enums/transactionType";

export function Insights() {
  return (
    <Grid
      templateColumns="repeat(24, 1fr)"
      rowGap={[2.5, 4]}
      columnGap={[0, 4, 4]}
      my={[1, 2]}
    >
      <GridItem colSpan={24}>
        <Heading fontSize={["lg", "xl"]} fontWeight="semibold" w="full">
          Métricas de {monthsName[new Date().getMonth()]}
        </Heading>
      </GridItem>

      <GridItem colSpan={[24, 24, 12, 10]}>
        <TransactionsCountByRecurrence
          transactionType={TransactionType.OUTCOME}
        />
      </GridItem>

      <GridItem colSpan={24}>
        <SpentAmountPerCategory />
      </GridItem>

      <GridItem colSpan={24}>
        <Heading fontSize={["lg", "xl"]} fontWeight="semibold" w="full" mt={[2.5, 4]}>
          Métricas gerais
        </Heading>
      </GridItem>

      <GridItem colSpan={24}>
        <PendingInstallmentsByTransaction
          transactionType={TransactionType.OUTCOME}
        />
      </GridItem>

      <GridItem colSpan={24}>
        <PendingInstallmentsByTransaction
          transactionType={TransactionType.INCOME}
        />
      </GridItem>
    </Grid>
  );
}
