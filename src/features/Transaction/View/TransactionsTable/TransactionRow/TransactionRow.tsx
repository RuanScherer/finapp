import {
  HStack,
  IconButton,
  Tag,
  TagLabel,
  TagLeftIcon,
  Td,
  Tr,
} from "@chakra-ui/react";
import { Tooltip } from "@components/Tooltip";
import { useTransactionsView } from "@contexts/TransactionsViewContext";
import { TransactionStatus } from "@shared/enums/transactionStatus";
import { TransactionType } from "@shared/enums/transactionType";
import { currencyFormatter } from "@shared/utils/currencyFormatter";
import { theme } from "@theme/index";
import {
  RxArrowBottomLeft,
  RxArrowTopRight,
  RxCheck,
  RxCheckCircled,
  RxClock,
  RxCounterClockwiseClock,
  RxTrash,
} from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { TransactionRowProps } from "./TransactionRow.types";

const defaultTagProps = {
  variant: "subtle",
  fontSize: "smaller",
  borderRadius: "full",
};

const defaultActionTooltipProps = {
  hasArrow: true,
  placement: "top" as any,
  borderRadius: "md",
  fontSize: "xs",
};

export function TransactionRow({ transaction, onRemove }: TransactionRowProps) {
  const { updateTransactionStatusByRefId } = useTransactionsView();
  const navigate = useNavigate();

  function handleSettleTransaction(event: React.MouseEvent) {
    event.stopPropagation();
    updateTransactionStatusByRefId({
      refId: transaction.ref.id,
      status: TransactionStatus.SETTLED,
    });
  }

  function handleMakeTransactionPending(event: React.MouseEvent) {
    event.stopPropagation();
    updateTransactionStatusByRefId({
      refId: transaction.ref.id,
      status: TransactionStatus.PENDENT,
    });
  }

  function handleRemoveTransaction(event: React.MouseEvent) {
    event.stopPropagation();
    onRemove(transaction);
  }

  function handleSelectTransaction() {
    const id = transaction.transactionRefId || transaction.ref.id;
    navigate(`/transaction/${id}`);
  }

  function getTransactionName() {
    let name = transaction.name;

    if (transaction.installmentOrder && transaction.installmentAmount) {
      name += ` (${transaction.installmentOrder}/${transaction.installmentAmount})`;
    }
    return name;
  }

  return (
    <Tr
      transition=".3s"
      cursor="pointer"
      _hover={{ bgColor: "gray.50" }}
      onClick={handleSelectTransaction}
    >
      <Td>{getTransactionName()}</Td>

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
            transaction.status === TransactionStatus.PENDENT ? "red" : "green"
          }
        >
          {transaction.status === TransactionStatus.PENDENT ? (
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
          {transaction.status === TransactionStatus.PENDENT ? (
            <Tooltip {...defaultActionTooltipProps} label="Quitar transação">
              <IconButton
                size="sm"
                colorScheme="green"
                aria-label="Quitar transação"
                icon={<RxCheck size={20} />}
                borderRadius="full"
                onClick={handleSettleTransaction}
              />
            </Tooltip>
          ) : (
            <Tooltip
              {...defaultActionTooltipProps}
              label="Tornar transação pendente"
            >
              <IconButton
                size="sm"
                colorScheme="red"
                aria-label="Tornar transação pendente"
                icon={<RxCounterClockwiseClock size={18} />}
                borderRadius="full"
                onClick={handleMakeTransactionPending}
              />
            </Tooltip>
          )}

          <Tooltip {...defaultActionTooltipProps} label="Excluir transação">
            <IconButton
              size="sm"
              aria-label="Excluir transação"
              icon={<RxTrash size={18} />}
              borderRadius="full"
              onClick={handleRemoveTransaction}
            />
          </Tooltip>
        </HStack>
      </Td>
    </Tr>
  );
}
