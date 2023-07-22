import {
  Box, Center, Heading,
  HStack,
  Input,
  List, Skeleton,
  Spinner
} from "@chakra-ui/react";
import { Card } from "@components/Card";
import { Tooltip } from "@components/Tooltip";
import { useTransactionsView } from "@contexts/TransactionsViewContext";
import { TransactionsList } from "@features/Transaction/View/TransactionsList";
import { TransactionsTable } from "@features/Transaction/View/TransactionsTable";
import { monthsName } from "@shared/constants/monthsName";
import { formatDateToUTC } from "@shared/utils/formatDateToUTC";
import { getRangeDatesByBaseDate } from "@shared/utils/getRangeDates";
import { ChangeEvent } from "react";
import { RxInfoCircled } from "react-icons/rx";

export function TransactionsView() {
  const { transactions, getTransactionsViewByMonth, transactionsQueryDates } =
    useTransactionsView();

  function handleChangeBaseDate(event: ChangeEvent<HTMLInputElement>) {
    const baseDate = event.target.value;

    // check if date is invalid
    if (!baseDate) return;

    const rangeDates = getRangeDatesByBaseDate(
      formatDateToUTC(new Date(baseDate))
    );
    getTransactionsViewByMonth(rangeDates);
  }

  return (
    <>
      <HStack
        alignItems="center"
        justifyContent={["center", "center", "space-between"]}
        wrap="wrap"
        gap={2}
        mt={2}
        mb={4}
      >
        <Heading
          fontSize="xl"
          fontWeight="semibold"
          textAlign={["center", "center", "start"]}
          w={["full", "full", "fit-content"]}
        >
          Transações de {monthsName[transactionsQueryDates.fromDate.getMonth()]}
        </Heading>

        <HStack alignItems="center" gap="1">
          <Tooltip
            label="Será exibida a visão do mês referente a data selecionada"
            placement="top"
            borderRadius="md"
            fontSize="xs"
            textAlign="center"
            hasArrow
          >
            <Box>
              <RxInfoCircled size={20} />
            </Box>
          </Tooltip>

          <Input
            type="date"
            variant="filled"
            w="fit-content"
            _focus={{
              borderColor: "primary.300",
            }}
            value={transactionsQueryDates.fromDate.toISOString().split("T")[0]}
            onChange={handleChangeBaseDate}
          />
        </HStack>
      </HStack>

      <Card display={["none", "none", "block"]}>
        {transactions ? (
          <TransactionsTable transactions={transactions} />
        ) : (
          <>
            {Array(10)
              .fill(undefined)
              .map((_, index) => (
                <Skeleton
                  h="40px"
                  startColor="gray.100"
                  endColor="gray.300"
                  mt={index === 0 ? 0 : 2}
                  key={index}
                />
              ))}
          </>
        )}
      </Card>

      <Card p={0}>
        <List display={["flex", "flex", "none"]} flexDirection="column">
          {transactions ? (
            <TransactionsList transactions={transactions} />
          ) : (
            <Center p={4}>
              <Spinner color="primary.500" speed="1s" />
            </Center>
          )}
        </List>
      </Card>
    </>
  );
}
