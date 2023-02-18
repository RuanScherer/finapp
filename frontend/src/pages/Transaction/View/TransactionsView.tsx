import {
  Box,
  Heading,
  HStack,
  Input,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Container } from "@components/Container";
import { Header } from "@components/Header";
import { Card } from "@features/Dashboard/Card";
import { monthsName } from "@shared/constants/monthsName";
import { currencyFormatter } from "@shared/utils/currencyFormatter";
import { theme } from "@theme/index";
import { RxArrowBottomLeft } from "react-icons/rx";

const transactions = [
  {
    id: 1,
    name: "Finclass",
    type: "DESPESA",
    category: "Estudos",
    paymentMethod: "Cartão de crédito",
    amount: 24.9,
    status: "PENDENTE",
  },
  {
    id: 2,
    name: "Faculdade",
    type: "DESPESA",
    category: "Estudos",
    paymentMethod: "Cartão de crédito",
    amount: 24.9,
    status: "PENDENTE",
  },
  {
    id: 2,
    name: "Faculdade",
    type: "DESPESA",
    category: "Estudos",
    paymentMethod: "Cartão de crédito",
    amount: 24.9,
    status: "PENDENTE",
  },
  {
    id: 2,
    name: "Faculdade",
    type: "DESPESA",
    category: "Estudos",
    paymentMethod: "Cartão de crédito",
    amount: 24.9,
    status: "PENDENTE",
  },
  {
    id: 2,
    name: "Faculdade",
    type: "DESPESA",
    category: "Estudos",
    paymentMethod: "Cartão de crédito",
    amount: 24.9,
    status: "PENDENTE",
  },
  {
    id: 2,
    name: "Faculdade",
    type: "DESPESA",
    category: "Estudos",
    paymentMethod: "Cartão de crédito",
    amount: 24.9,
    status: "PENDENTE",
  },
  {
    id: 2,
    name: "Faculdade",
    type: "DESPESA",
    category: "Estudos",
    paymentMethod: "Cartão de crédito",
    amount: 24.9,
    status: "PENDENTE",
  },
];

export function TransactionsView() {
  return (
    <Container>
      <Box mb="4">
        <Header />
      </Box>

      <HStack alignItems="center" justifyContent="end" my="4">
        <Heading fontSize="2xl" fontWeight="semibold" w="full">
          Transações de {monthsName[new Date().getMonth()]}
        </Heading>

        <Input type="date" w="fit-content" />
      </HStack>

      <Card>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Tipo</Th>
                <Th>Categoria</Th>
                <Th>Forma de pagamento</Th>
                <Th>Valor</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((transaction) => (
                <Tr>
                  <Td>{transaction.name}</Td>
                  <Td>
                    <RxArrowBottomLeft
                      color={theme.colors.red[500]}
                      strokeWidth="1"
                    />
                  </Td>
                  <Td>
                    <Tag
                      variant="subtle"
                      size="md"
                      bgColor="gray.200"
                      borderRadius="full"
                    >
                      {transaction.category}
                    </Tag>
                  </Td>
                  <Td>
                    <Tag
                      variant="subtle"
                      size="md"
                      bgColor="gray.200"
                      borderRadius="full"
                    >
                      {transaction.paymentMethod}
                    </Tag>
                  </Td>
                  <Td>{currencyFormatter.format(transaction.amount)}</Td>
                  <Td>{transaction.status}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
}
