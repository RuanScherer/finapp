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
import { TransactionsStatus } from "@shared/enums/transactionStatus";
import { TransactionType } from "@shared/enums/transactionType";
import { currencyFormatter } from "@shared/utils/currencyFormatter";
import { theme } from "@theme/index";
import {
  RxArrowBottomLeft,
  RxArrowTopRight,
  RxCheck,
  RxCheckCircled,
  RxClock,
  RxPencil1,
} from "react-icons/rx";
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

export function TransactionRow({ transaction, onClick }: TransactionRowProps) {
  function handleSelectTransaction() {
    onClick(transaction);
  }

  return (
    <Tr transition=".3s" _hover={{ bgColor: "gray.50" }}>
      <Td>{transaction.name}</Td>

      <Td>
        {transaction.type === TransactionType.RECEITA ? (
          <RxArrowBottomLeft color={theme.colors.green[500]} strokeWidth="1" />
        ) : (
          <RxArrowTopRight color={theme.colors.red[500]} strokeWidth="1" />
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
            transaction.status === TransactionsStatus.PENDENTE ? "red" : "green"
          }
        >
          {transaction.status === TransactionsStatus.PENDENTE ? (
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
          <Tooltip {...defaultActionTooltipProps} label="Quitar transação">
            <IconButton
              size="sm"
              colorScheme="primary"
              aria-label="Quitar transação"
              icon={<RxCheck size={20} />}
              borderRadius="full"
            />
          </Tooltip>

          <Tooltip
            {...defaultActionTooltipProps}
            label="Ver detalhes da transação"
          >
            <IconButton
              size="sm"
              aria-label="Ver detalhes da transação"
              icon={<RxPencil1 size={18} />}
              borderRadius="full"
            />
          </Tooltip>
        </HStack>
      </Td>
    </Tr>
  );
}
