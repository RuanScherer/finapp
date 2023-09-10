import {
  Box, Heading,
  HStack, Text,
  theme,
  VStack
} from "@chakra-ui/react";
import { TransactionStatus } from "@shared/enums/transactionStatus";
import { TransactionType } from "@shared/enums/transactionType";
import { currencyFormatter } from "@shared/utils/currencyFormatter";
import { getTransactionName } from "@shared/utils/transactionUtils";
import {
  RxArrowBottomLeft,
  RxArrowTopRight,
  RxCheckCircled,
  RxClock
} from "react-icons/rx";
import { TransactionCardProps } from "./TransactionCard.types";

export function TransactionCard(props: TransactionCardProps) {
  return (
    <HStack w="full" justifyContent="space-between">
      <VStack flex={1} gap={0.5} alignItems="start">
        <Heading
          fontSize="md"
          fontWeight="medium"
          lineHeight="base"
        >
          {getTransactionName(props.transaction)}
        </Heading>

        <Text
          display="flex"
          alignItems="center"
          gap={1}
          fontSize="sm"
          fontWeight="medium"
          lineHeight="none"
          color={props.transaction.type === TransactionType.INCOME ? "green.400" : "red.400"}
          style={{ marginTop: 0 }}
        >
          {currencyFormatter.format(props.transaction.amount)}

          {props.transaction.type === TransactionType.INCOME ? (
            <RxArrowTopRight
              size={12}
              color={theme.colors.green[400]}
              strokeWidth="1"
            />
          ) : (
            <RxArrowBottomLeft
              size={12}
              color={theme.colors.red[400]}
              strokeWidth="1"
            />
          )}
        </Text>
      </VStack>

      <Box
        borderRadius="full"
        bgColor={
          props.transaction.status === TransactionStatus.SETTLED
            ? "green.100"
            : "red.100"
        }
        p={1.5}
      >
        {props.transaction.status === TransactionStatus.SETTLED ? (
          <RxCheckCircled
            color={theme.colors.green[500]}
            strokeWidth="0.5"
          />
        ) : (
          <RxClock
            color={theme.colors.red[500]}
            strokeWidth="0.5"
          />
        )}
      </Box>
    </HStack>
  );
}
