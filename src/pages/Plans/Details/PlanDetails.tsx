import { Divider, Heading, HStack, IconButton, List, ListItem, SimpleGrid, Spacer, Text, VStack } from "@chakra-ui/react";
import { Card } from "@components/Card";
import { PlanCard } from "@features/Plans/Details/PlanCard";
import { currencyFormatter } from "@shared/utils/currencyFormatter";
import { RxTrash } from "react-icons/rx";
import { usePlanDetails } from "./usePlanDetails";

const mock = [{
  id: 1,
  description: 'Primeiro depósito',
  value: 1000,
  createdAt: new Date(),
}, {
  id: 2,
  value: 1000,
  createdAt: new Date(),
}, {
  id: 3,
  value: 1000,
  createdAt: new Date(),
}, {
  id: 4,
  description: 'Alguma coisa',
  value: 1000,
  createdAt: new Date(),
}]

export function PlanDetails() {
  const {
    plan,
    isPlanError,
    isPlanLoading,
    refetchPlan
  } = usePlanDetails()

  return (
    <SimpleGrid
      columns={[1, 1, 1, 2]}
      templateColumns={["1fr", "1fr", "1fr", "10fr 14fr"]}
      gap={4}
    >
      <PlanCard
        position={["unset", "unset", "unset", "sticky"]}
        top={4}
        h="fit-content"
        plan={plan}
      />

      <VStack alignItems="stretch" h="fit-content">
        <Card>
          <Heading fontSize="xl" fontWeight="semibold">
            Histórico
          </Heading>

          <List flexDirection="column" mt={2}>
            <ListItem
              w="full"
              mt={2}
            >
              <Text fontSize="sm" color="gray.500">
                11/07/2023
              </Text>
            </ListItem>

            {mock.map((deposit, index) => (
              <ListItem
                w="full"
                borderBottomWidth={index < mock.length - 1 ? 1 : 0}
                borderBottomColor="gray.200"
                py={2}
                key={deposit.id}
              >
                <HStack>
                  <Text fontWeight="medium" color="green.400">
                    + {currencyFormatter.format(deposit.value)}
                  </Text>

                  {deposit.description && (
                    <>
                      <Divider orientation="vertical" h={4} mx={2} borderColor="gray.500" />
                      <Text color="blackAlpha.800">{deposit.description}</Text>
                    </>
                  )}

                  <Spacer />

                  <IconButton
                    aria-label="Remover registro"
                    icon={<RxTrash strokeWidth={0.4} size={18} />}
                    variant="ghost"
                    size="sm"
                    colorScheme="red"
                  />
                </HStack>
              </ListItem>
            ))}
          </List>
        </Card>
      </VStack>
    </SimpleGrid>
  )
}