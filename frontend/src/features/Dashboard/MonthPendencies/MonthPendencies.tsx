import { Heading, SimpleGrid, Skeleton } from "@chakra-ui/react";
import { Stat } from "../../../components/Stat/Stat";
import { TransactionType } from "../../../shared/enums/transactionType";
import { Card } from "../Card";
import { useMonthPendencies } from "./useMonthPendencies";

export function MonthPendencies() {
  const { pendentAmountToPay, pendentAmountToReceive } = useMonthPendencies()

  return (
    <Card>
      <Heading fontSize="xl" fontWeight="semibold">
        Valores em aberto
      </Heading>

      <SimpleGrid columns={2} gap="2">
        {pendentAmountToPay != undefined ? (
          <Stat
            type={TransactionType.DESPESA}
            amount={pendentAmountToPay}
          />
        ) : (
          <Skeleton h="20px" mt="2.5" />
        )}

        {pendentAmountToReceive != undefined ? (
          <Stat
            type={TransactionType.RECEITA}
            amount={pendentAmountToReceive}
          />
        ) : (
          <Skeleton h="20px" mt="2.5" />
        )}
      </SimpleGrid>
    </Card>
  )
}
