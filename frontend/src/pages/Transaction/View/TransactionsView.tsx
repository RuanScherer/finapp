import {
  Box,
  Heading,
  HStack,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Container } from "../../../components/Container";
import { Header } from "../../../components/Header";
import { Card } from "../../../features/Dashboard/Card";
import { monthsName } from "../../../shared/constants/monthsName";

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
              <Tr>
                <Td>Finclass</Td>
                <Td>Tipo</Td>
                <Td>Estudos</Td>
                <Td>Cartão de crédito</Td>
                <Td>R$ 24,90</Td>
                <Td>Pendente</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
}
