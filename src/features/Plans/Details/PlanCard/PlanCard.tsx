import { CircularProgress, CircularProgressLabel, Flex, Heading, HStack, Skeleton, SkeletonCircle, Text, VStack } from "@chakra-ui/react";
import { Card } from "@components/Card";
import { currencyFormatter } from "@shared/utils/currencyFormatter";
import { getProgressColor, getProgressValue } from "@shared/utils/planUtils";
import { PlanCardProps } from "./PlanCard.types";

export function PlanCard({ plan, ...rest }: PlanCardProps) {
  if (!plan) {
    return (
      <Card {...rest} p={[3, 4]}>
        <HStack alignItems="start" justifyContent="space-between" gap={1}>
          <VStack flex={1} alignItems="stretch" gap={1}>
            <Skeleton w="50%" h={6} mb={3} />

            <Skeleton w="full" h={5} />
            <Skeleton w="full" h={5} />

            <Skeleton w="full" h={5} />
          </VStack>

          <SkeletonCircle size="16" />
        </HStack>

      </Card>
    )
  }

  const progress = getProgressValue(plan.currentValue, plan.plannedValue)

  return (
    <Card {...rest} p={[3, 4]}>
      <Flex
        flexDirection={["column-reverse", "row"]}
        alignItems="start"
        justifyContent="space-between"
        gap={[2.5, 1]}
      >
        <VStack alignItems="stretch" gap={1}>
          <Heading fontSize={["lg", "xl"]} fontWeight="semibold" mb={[1.5, 3]}>
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
          <CircularProgressLabel fontSize="md">
            {progress >= 100 ? "100%" : `${Math.floor(progress)}%`}
          </CircularProgressLabel>
        </CircularProgress>
      </Flex>
    </Card>
  )
}