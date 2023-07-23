import { Tag, TagLabel, Td, Text, theme, Tr } from "@chakra-ui/react";
import { TransactionType } from "@shared/enums/transactionType";
import { currencyFormatter } from "@shared/utils/currencyFormatter";
import { getTransactionIdToNavigate, getTransactionName } from "@shared/utils/transactionUtils";
import { RxArrowBottomLeft, RxArrowTopRight } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { Transaction } from "../../PendingTransactions.types";

interface TransactionRowProps {
  transaction: Transaction;
}

export function TransactionRow({ transaction }: TransactionRowProps) {
  const navigate = useNavigate();

  function handleSelectTransaction() {
    const id = getTransactionIdToNavigate(transaction);
    navigate(`/transaction/${id}`);
  }

  return (
    <Tr
      transition=".3s"
      cursor="pointer"
      _hover={{ bgColor: "gray.50" }}
      onClick={handleSelectTransaction}
    >
      <Td>
        <Text color="text.700">{getTransactionName(transaction)}</Text>
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
