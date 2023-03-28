import { Heading, SimpleGrid, Skeleton } from "@chakra-ui/react";
import { Stat } from "@components/Stat/Stat";
import { TransactionType } from "@shared/enums/transactionType";
import { Card } from "../Card";
import { useMonthPendencies } from "./useMonthPendencies";

export function MonthPendencies() {
  const {
    isLoadingPendentAmountToPay,
    isErrorPendentAmountToPay,
    pendentAmountToPay,
    isLoadingPendentAmountToReceive,
    isErrorPendentAmountToReceive,
    pendentAmountToReceive,
  } = useMonthPendencies();

  return (
    <Card>
      <Heading fontSize="xl" fontWeight="semibold">
        Valores em aberto
      </Heading>

      <SimpleGrid columns={2} gap="2">
        {isLoadingPendentAmountToPay || isErrorPendentAmountToPay ? (
          <Skeleton h="20px" mt="2.5" />
        ) : (
          <Stat type={TransactionType.DESPESA} amount={pendentAmountToPay!} />
        )}

        {isLoadingPendentAmountToReceive || isErrorPendentAmountToReceive ? (
          <Skeleton h="20px" mt="2.5" />
        ) : (
          <Stat
            type={TransactionType.RECEITA}
            amount={pendentAmountToReceive!}
          />
        )}
      </SimpleGrid>
    </Card>
  );
}
