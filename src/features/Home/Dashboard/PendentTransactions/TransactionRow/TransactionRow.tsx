import { Tag, Td, Text, theme, Tr } from "@chakra-ui/react";
import { RxArrowBottomLeft, RxArrowTopRight } from "react-icons/rx";
import { TransactionType } from "../../../../../shared/enums/transactionType";
import { currencyFormatter } from "../../../../../shared/utils/currencyFormatter";
import { Transaction } from "../PendentTransactions.types";

interface TransactionRowProps {
  transaction: Transaction
}

export function TransactionRow({ transaction }: TransactionRowProps) {
  return (
    <Tr>
      <Td>
        <Text color="text.700">
          {transaction.name}
        </Text>
      </Td>
      <Td>
        <Tag
          variant="subtle"
          size="sm"
          bgColor="gray.200"
          borderRadius="full"
        >
          {transaction.category}
        </Tag>
      </Td>
      <Td>
        {transaction.type === TransactionType.DESPESA ? (
          <RxArrowBottomLeft color={theme.colors.red[500]} />
        ) : (
          <RxArrowTopRight color={theme.colors.green[500]} />
        )}
      </Td>
      <Td>
        <Text fontWeight="semibold">
          {currencyFormatter.format(transaction.amount)}
        </Text>
      </Td>
    </Tr>
  )
}
