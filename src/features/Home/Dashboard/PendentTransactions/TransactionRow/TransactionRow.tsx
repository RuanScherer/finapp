import { HStack, Tag, Text, theme } from "@chakra-ui/react";
import { RxArrowBottomLeft, RxArrowTopRight } from "react-icons/rx";
import { TransactionType } from "../../../../../shared/enums/transactionType";
import { currencyFormatter } from "../../../../../shared/utils/currencyFormatter";
import { Transaction } from "../PendentTransactions.types";

interface TransactionRowProps {
  transaction: Transaction
}

export function TransactionRow({ transaction }: TransactionRowProps) {
  return (
    <HStack justifyContent="space-between" alignItems="center" mt="2">
      <HStack alignItems="center">
        <Text color="text.700">
          {transaction.name}
        </Text>
        <Tag
          variant="subtle"
          size="sm"
          bgColor="gray.200"
          borderRadius="full"
        >
          {transaction.category}
        </Tag>
      </HStack>
      
      <HStack alignItems="center">
        {transaction.type === TransactionType.DESPESA ? (
          <RxArrowBottomLeft color={theme.colors.red[500]} />
        ) : (
          <RxArrowTopRight color={theme.colors.green[500]} />
        )}
        <Text fontWeight="semibold">
          {currencyFormatter.format(transaction.amount)}
        </Text>
      </HStack>
    </HStack>
  )
}
