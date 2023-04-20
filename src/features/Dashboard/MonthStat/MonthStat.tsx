import { HStack, Spinner, Text, theme } from "@chakra-ui/react";
import { Card } from "@components/Card";
import { TransactionType } from "@shared/enums/transactionType";
import { currencyFormatter } from "@shared/utils/currencyFormatter";
import { RxArrowBottomLeft, RxArrowTopRight } from "react-icons/rx";
import { MonthStatProps } from "./MonthStat.types";
import { useMonthStat } from "./useMonthStat";

export function MonthStat({ type }: MonthStatProps) {
  const { amount, pendentAmount } = useMonthStat(type);

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
    <Card bgColor={cardBgColor}>
      <HStack alignItems="center" spacing={1} justifyContent="space-between">
        <Text fontWeight="medium" color="gray.700">
          {type === TransactionType.OUTCOME ? "Despesas" : "Receitas"}
        </Text>

        <Icon color={color} size={16} strokeWidth="1" />
      </HStack>

      {amount === undefined ? (
        <Spinner color="primary.500" my={2} speed="1s" />
      ) : (
        <Text fontSize="2xl" fontWeight="medium">
          {currencyFormatter.format(amount ?? 0)}
        </Text>
      )}

      {pendentAmount !== undefined && (
        <Text fontSize="sm">
          {currencyFormatter.format(pendentAmount ?? 0)} em aberto
        </Text>
      )}
    </Card>
  );
}
