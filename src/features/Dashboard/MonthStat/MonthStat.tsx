import { Heading, Skeleton } from "@chakra-ui/react";
import { Stat } from "@components/Stat/Stat";
import { TransactionType } from "@shared/enums/transactionType";
import { Card } from "../Card";
import { MonthStatProps } from "./MonthStat.types";
import { useMonthStat } from "./useMonthStat";

export function MonthStat({ type }: MonthStatProps) {
  const { amount, isLoading, isError } = useMonthStat(type);

  return (
    <Card>
      <Heading fontSize="xl" fontWeight="semibold">
        {type === TransactionType.OUTCOME ? "Despesas" : "Receitas"}
      </Heading>

      {isLoading || isError ? (
        <Skeleton h="40px" mt="2.5" />
      ) : (
        <Stat type={type} amount={amount ?? 0} />
      )}
    </Card>
  );
}
