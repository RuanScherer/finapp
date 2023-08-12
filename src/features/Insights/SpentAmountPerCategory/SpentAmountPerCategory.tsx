import {
  Box,
  Center,
  Heading,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { Card } from "@components/Card";
import { EmptyState } from "@components/EmptyState";
import { currencyFormatter } from "@shared/utils/currencyFormatter";
import { useSpentAmountPerCategory } from "./useSpentAmountPerCategory";

export function SpentAmountPerCategory() {
  const { spentAmountPerCategory } = useSpentAmountPerCategory();

  return (
    <Box mt={2}>
      <Heading fontSize="lg" fontWeight="medium">
        Valor gasto por categoria
      </Heading>

      <Text
        fontSize="sm"
        color="text.700"
        mt={0.5}
        mb={4}
      >
        Essas são as top 5 categorias com mais gastos registrados no mês.
      </Text>

      {spentAmountPerCategory ? (
        spentAmountPerCategory.length > 0 ? (
          <Card>
            <Box w="full">
              <TableContainer>
                <Table colorScheme="gray" size={["sm", "sm", "md"]}>
                  <Thead>
                    <Tr>
                      <Th>#</Th>
                      <Th>Categoria</Th>
                      <Th>Valor</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {spentAmountPerCategory.map((item, index) => (
                      <Tr key={item.category}>
                        <Td>{index + 1}</Td>
                        <Td>{item.category}</Td>
                        <Td>{currencyFormatter.format(item.amount)}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </Card>
        ) : (
          <EmptyState>
            Não existem transações neste mês para base de cálculo.
          </EmptyState>
        )
      ) : (
        <Center>
          <Spinner color="primary.400" size="xl" mt="2" speed="1s" />
        </Center>
      )}
    </Box>
  );
}
