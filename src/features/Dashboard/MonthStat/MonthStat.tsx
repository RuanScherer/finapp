import { Heading, Skeleton } from "@chakra-ui/react";
import { Stat } from "@components/Stat/Stat";
import { TransactionType } from "@shared/enums/transactionType";
import { Card } from "../Card";
import { MonthStatProps } from "./MonthStat.types";
import { useMonthStat } from "./useMonthStat";

export function MonthStat({ type }: MonthStatProps) {
  const { amount } = useMonthStat(type);

  return (
    <Card>
      <Heading fontSize="xl" fontWeight="semibold">
        {type === TransactionType.DESPESA ? "Despesas" : "Receitas"}
      </Heading>

      {amount != undefined ? (
        <Stat type={type} amount={amount} />
      ) : (
        <Skeleton h="40px" mt="2.5" />
      )}
    </Card>
  );
}
