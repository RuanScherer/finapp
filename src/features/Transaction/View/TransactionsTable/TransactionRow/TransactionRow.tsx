import {
  HStack,
  IconButton,
  Tag,
  TagLabel,
  TagLeftIcon,
  Td,
  Tr
} from "@chakra-ui/react";
import { useTransactionsView } from "@contexts/TransactionsViewContext";
import { TransactionStatus } from "@shared/enums/transactionStatus";
import { TransactionType } from "@shared/enums/transactionType";
import { currencyFormatter } from "@shared/utils/currencyFormatter";
import { getTransactionIdToNavigate, getTransactionName } from "@shared/utils/transactionUtils";
import { theme } from "@theme/index";
import {
  RxArrowBottomLeft,
  RxArrowTopRight,
  RxCheck,
  RxCheckCircled,
  RxClock,
  RxCounterClockwiseClock,
  RxTrash
} from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { TransactionRowProps } from "./TransactionRow.types";

const defaultTagProps = {
  variant: "subtle",
  fontSize: "smaller",
  borderRadius: "full",
};

export function TransactionRow({ transaction, onRemove }: TransactionRowProps) {
  const { updateTransactionStatusById } = useTransactionsView();
  const navigate = useNavigate();

  function handleSettleTransaction(event: React.MouseEvent) {
    event.stopPropagation();
    updateTransactionStatusById({
      id: transaction.id,
      status: TransactionStatus.SETTLED,
    });
  }

  function handleMakeTransactionPending(event: React.MouseEvent) {
    event.stopPropagation();
    updateTransactionStatusById({
      id: transaction.id,
      status: TransactionStatus.PENDING,
    });
  }

  function handleRemoveTransaction(event: React.MouseEvent) {
    event.stopPropagation();
    onRemove(transaction);
  }

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
      <Td>{getTransactionName(transaction)}</Td>

      <Td>
        {transaction.type === TransactionType.INCOME ? (
          <RxArrowTopRight color={theme.colors.green[500]} strokeWidth="1" />
        ) : (
          <RxArrowBottomLeft color={theme.colors.red[500]} strokeWidth="1" />
        )}
      </Td>

      <Td>
        <Tag {...defaultTagProps} colorScheme="gray">
          <TagLabel>{transaction.paymentMethod}</TagLabel>
        </Tag>
      </Td>

      <Td>
        <Tag {...defaultTagProps} colorScheme="gray">
          <TagLabel>{transaction.category}</TagLabel>
        </Tag>
      </Td>

      <Td>{currencyFormatter.format(transaction.amount)}</Td>

      <Td>
        <Tag
          {...defaultTagProps}
          colorScheme={
            transaction.status === TransactionStatus.PENDING ? "red" : "green"
          }
        >
          {transaction.status === TransactionStatus.PENDING ? (
            <>
              <TagLeftIcon as={RxClock} strokeWidth={0.5} />
              <TagLabel>Pendente</TagLabel>
            </>
          ) : (
            <>
              <TagLeftIcon as={RxCheckCircled} strokeWidth={0.5} />
              <TagLabel>Quitado</TagLabel>
            </>
          )}
        </Tag>
      </Td>

      <Td>
        <HStack gap="1">
          {transaction.status === TransactionStatus.PENDING ? (
            <IconButton
              size="sm"
              colorScheme="green"
              aria-label="Quitar transação"
              icon={<RxCheck size={20} />}
              borderRadius="full"
              onClick={handleSettleTransaction}
            />
          ) : (
            <IconButton
              size="sm"
              colorScheme="red"
              aria-label="Tornar transação pendente"
              icon={<RxCounterClockwiseClock size={18} />}
              borderRadius="full"
              onClick={handleMakeTransactionPending}
            />
          )}

          <IconButton
            size="sm"
            aria-label="Excluir transação"
            icon={<RxTrash size={18} />}
            borderRadius="full"
            onClick={handleRemoveTransaction}
          />
        </HStack>
      </Td>
    </Tr>
  );
}
