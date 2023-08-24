import { HStack, Spinner, Text, theme } from "@chakra-ui/react";
import { Card } from "@components/Card";
import { TransactionType } from "@shared/enums/transactionType";
import { currencyFormatter } from "@shared/utils/currencyFormatter";
import { RxArrowBottomLeft, RxArrowTopRight } from "react-icons/rx";
import { MonthStatProps } from "./MonthStat.types";
import { useMonthStat } from "./useMonthStat";

export function MonthStat({ type }: MonthStatProps) {
  const { amount, pendingAmount } = useMonthStat(type);

  let cardBgColor;
  let color;
  let Icon;

  if (type === TransactionType.OUTCOME) {
    cardBgColor = "#FEE9F3";
    color = theme.colors.red[500];
    Icon = RxArrowBottomLeft;
  } else {
    cardBgColor = "#D8F7F5";
    color = theme.colors.green[400];
    Icon = RxArrowTopRight;
  }

  return (
    <Card bgColor={cardBgColor} p={[4, 5]}>
      <HStack alignItems="center" spacing={1} justifyContent="space-between">
        <Text fontSize={["sm", "md"]} fontWeight="medium" color="gray.700">
          {type === TransactionType.OUTCOME ? "Despesas" : "Receitas"}
        </Text>

        <Icon color={color} size={16} strokeWidth="1" />
      </HStack>

      {amount === undefined ? (
        <Spinner color="primary.500" my={2} speed="1s" />
      ) : (
        <Text fontSize={["lg", "2xl"]} fontWeight="medium">
          {currencyFormatter.format(amount ?? 0)}
        </Text>
      )}

      {pendingAmount !== undefined && (
        <Text fontSize={["xs", "sm"]}>
          {currencyFormatter.format(pendingAmount ?? 0)} em aberto
        </Text>
      )}
    </Card>
  );
}
