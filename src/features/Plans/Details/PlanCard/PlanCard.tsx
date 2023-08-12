import { Card, CircularProgress, CircularProgressLabel, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { currencyFormatter } from "@shared/utils/currencyFormatter";
import { getProgressColor, getProgressValue } from "@shared/utils/planUtils";
import { PlanCardProps } from "./PlanCard.types";

export function PlanCard({ plan, ...rest }: PlanCardProps) {
  if (!plan) {
    return <></>// criar skeleton
  }

  const progress = getProgressValue(plan.currentValue, plan.plannedValue)

  return (
    <Card {...rest}>
      <HStack alignItems="start" justifyContent="space-between" gap={1}>
        <VStack alignItems="stretch" gap={1}>
          <Heading fontSize="xl" fontWeight="semibold" mb={3}>
            {plan.name}
          </Heading>

          <Text as="span" color="blackAlpha.800" fontWeight="medium" style={{ marginTop: 0 }}>
            Valor alcançado:
            {' '}
            <Text as="span" fontWeight="normal" color="inherit">
              {currencyFormatter.format(plan.currentValue)}
            </Text>
          </Text>

          <Text as="span" color="blackAlpha.800" fontWeight="medium" style={{ marginTop: 0 }}>
            Valor planejado:
            {' '}
            <Text as="span" fontWeight="normal" color="inherit">
              {currencyFormatter.format(plan.plannedValue)}
            </Text>
          </Text>

          {plan.dueDate && (
            <Text as="span">
              Plano para até {new Intl.DateTimeFormat('pt-BR').format(plan.dueDate)}
            </Text>
          )}
        </VStack>

        <CircularProgress
          size={16}
          value={progress}
          color={getProgressColor(progress)}
          trackColor="gray.200"
          capIsRound
        >
          <CircularProgressLabel fontSize="md">{progress}%</CircularProgressLabel>
        </CircularProgress>
      </HStack>
    </Card>
  )
}