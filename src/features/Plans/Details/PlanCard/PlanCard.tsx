import { Button, ButtonProps, CircularProgress, CircularProgressLabel, Flex, Heading, HStack, IconButton, Skeleton, SkeletonCircle, Text, theme, useDisclosure, VStack } from "@chakra-ui/react";
import { Card } from "@components/Card";
import { DepositForm } from "@features/Plans/DepositForm";
import { PlanForm } from "@features/Plans/PlanForm";
import { currencyFormatter } from "@shared/utils/currencyFormatter";
import { getProgressColor, getProgressValue } from "@shared/utils/planUtils";
import { RxPencil1, RxPlus, RxTrash } from "react-icons/rx";
import { ConfirmPlanRemovalModal } from "./ConfirmPlanRemovalModal";
import { PlanCardProps } from "./PlanCard.types";
import { usePlanCard } from "./usePlanCard";

const actionButtonCommonProps: ButtonProps = {
  flex: 1,
  size: "sm",
  color: "blackAlpha.800",
  _focus: { shadow: "none" }
}

export function PlanCard({ plan, ...rest }: PlanCardProps) {
  const { removePlan } = usePlanCard(plan?.id)
  const planFormDisclosure = useDisclosure()
  const depositFormDisclosure = useDisclosure()
  const confirmPlanRemovalDisclosure = useDisclosure()

  function handleConfirmPlanRemoval() {
    removePlan()
    confirmPlanRemovalDisclosure.onClose()
  }

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
    <>
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

        <HStack mt={4}>
          <Button
            {...actionButtonCommonProps}
            leftIcon={<RxPlus strokeWidth={0.8} />}
            onClick={depositFormDisclosure.onOpen}
          >
            Registrar
          </Button>

          <Button
            {...actionButtonCommonProps}
            leftIcon={
              <RxPencil1
                strokeWidth={0.4}
                stroke={theme.colors.blackAlpha[800]}
                fill={theme.colors.blackAlpha[800]}
              />
            }
            onClick={planFormDisclosure.onOpen}
          >
            Editar
          </Button>

          <IconButton
            aria-label="Excluir plano"
            icon={<RxTrash strokeWidth={0.4} size={18} />}
            size="sm"
            colorScheme="red"
            onClick={confirmPlanRemovalDisclosure.onOpen}
          />
        </HStack>
      </Card>

      <PlanForm
        isOpen={planFormDisclosure.isOpen}
        onClose={planFormDisclosure.onClose}
        plan={plan}
        isEditing
      />

      <DepositForm
        isOpen={depositFormDisclosure.isOpen}
        onClose={depositFormDisclosure.onClose}
        plan={plan}
      />

      <ConfirmPlanRemovalModal
        isOpen={confirmPlanRemovalDisclosure.isOpen}
        onClose={confirmPlanRemovalDisclosure.onClose}
        onConfirm={handleConfirmPlanRemoval}
        plan={plan}
      />
    </>
  )
}