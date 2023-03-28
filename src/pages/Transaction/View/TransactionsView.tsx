import {
  Box,
  Heading,
  HStack,
  Input,
  Skeleton,
  Tooltip,
} from "@chakra-ui/react";
import { Container } from "@components/Container";
import { Header } from "@components/Header";
import { useTransactionsView } from "@contexts/TransactionsViewContext";
import { Card } from "@features/Dashboard/Card";
import { TransactionsTable } from "@features/Transaction/View/TransactionsTable";
import { monthsName } from "@shared/constants/monthsName";
import { formatDateToUTC } from "@shared/utils/formatDateToUTC";
import { getRangeDatesByBaseDate } from "@shared/utils/getRangeDates";
import { ChangeEvent } from "react";
import { RxInfoCircled } from "react-icons/rx";

export function TransactionsView() {
  const { transactions, getTransactionsViewByMonth } = useTransactionsView();

  function handleChangeBaseDate(event: ChangeEvent<HTMLInputElement>) {
    const baseDate = event.target.value;

    // check if date is invalid
    if (!baseDate) return;
    console.log(baseDate);

    const rangeDates = getRangeDatesByBaseDate(
      formatDateToUTC(new Date(baseDate))
    );
    getTransactionsViewByMonth(rangeDates);
  }

  return (
    <Container>
      <Box mb="4">
        <Header />
      </Box>

      <HStack alignItems="center" justifyContent="end" my="4">
        <Heading fontSize="2xl" fontWeight="semibold" w="full">
          Transações de {monthsName[new Date().getMonth()]}
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
              background: "primaryAlpha.200",
              borderColor: "primary.300",
            }}
            onChange={handleChangeBaseDate}
          />
        </HStack>
      </HStack>

      <Card>
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
    </Container>
  );
}
