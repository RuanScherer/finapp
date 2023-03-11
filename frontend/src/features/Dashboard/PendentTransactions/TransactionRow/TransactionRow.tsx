import { Tag, TagLabel, Td, Text, theme, Tr } from "@chakra-ui/react";
import { TransactionType } from "@shared/enums/transactionType";
import { currencyFormatter } from "@shared/utils/currencyFormatter";
import { RxArrowBottomLeft, RxArrowTopRight } from "react-icons/rx";
import { Transaction } from "../PendentTransactions.types";

interface TransactionRowProps {
  transaction: Transaction;
}

export function TransactionRow({ transaction }: TransactionRowProps) {
  return (
    <Tr>
      <Td>
        <Text color="text.700">{transaction.name}</Text>
      </Td>
      <Td>
        <Tag variant="subtle" size="sm" borderRadius="full" colorScheme="gray">
          <TagLabel>{transaction.category}</TagLabel>
        </Tag>
      </Td>
      <Td>
        {transaction.type === TransactionType.RECEITA ? (
          <RxArrowBottomLeft color={theme.colors.green[500]} strokeWidth="1" />
        ) : (
          <RxArrowTopRight color={theme.colors.red[500]} strokeWidth="1" />
        )}
      </Td>
      <Td>
        <Text fontWeight="semibold">
          {currencyFormatter.format(transaction.amount)}
        </Text>
      </Td>
    </Tr>
  );
}
