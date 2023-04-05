import {
  HStack,
  IconButton,
  Tag,
  TagLabel,
  TagLeftIcon,
  Td,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
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
  RxPencil1,
} from "react-icons/rx";
import { Link } from "react-router-dom";
import { TransactionRowProps } from "./TransactionRow.types";

const defaultTagProps = {
  variant: "subtle",
  size: "md",
  fontSize: "smaller",
  borderRadius: "full",
};

const defaultActionTooltipProps = {
  hasArrow: true,
  placement: "top" as any,
  borderRadius: "md",
  fontSize: "xs",
};

export function TransactionRow({ transaction }: TransactionRowProps) {
  const { updateTransactionStatusByRefId } = useTransactionsView();

  function handleSettleTransaction() {
    updateTransactionStatusByRefId({
      refId: transaction.ref.id,
      status: TransactionStatus.SETTLED,
    });
  }

  function handleMakeTransactionPending() {
    updateTransactionStatusByRefId({
      refId: transaction.ref.id,
      status: TransactionStatus.PENDENT,
    });
  }

  return (
    <Tr transition=".3s" _hover={{ bgColor: "gray.50" }}>
      <Td>{transaction.name}</Td>

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

          <Tooltip
            {...defaultActionTooltipProps}
            label="Ver detalhes da transação"
          >
            <Link to={`/transactions/${transaction.ref.id}`}>
              <IconButton
                size="sm"
                aria-label="Ver detalhes da transação"
                icon={<RxPencil1 size={18} />}
                borderRadius="full"
              />
            </Link>
          </Tooltip>
        </HStack>
      </Td>
    </Tr>
  );
}
