import { Tag, TagLabel, Td, Text, theme, Tr } from "@chakra-ui/react";
import { TransactionType } from "@shared/enums/transactionType";
import { currencyFormatter } from "@shared/utils/currencyFormatter";
import { RxArrowBottomLeft, RxArrowTopRight } from "react-icons/rx";
import { Transaction } from "../PendingTransactions.types";

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
        <Tag
          variant="subtle"
          fontSize="smaller"
          borderRadius="full"
          colorScheme="gray"
        >
          <TagLabel>{transaction.category}</TagLabel>
        </Tag>
      </Td>
      <Td>
        {transaction.type === TransactionType.INCOME ? (
          <RxArrowTopRight color={theme.colors.green[500]} strokeWidth="1" />
        ) : (
          <RxArrowBottomLeft color={theme.colors.red[500]} strokeWidth="1" />
        )}
      </Td>
      <Td>
        <Text>{currencyFormatter.format(transaction.amount)}</Text>
      </Td>
    </Tr>
  );
}
