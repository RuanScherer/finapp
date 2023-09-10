import { Button, ButtonProps, CircularProgress, CircularProgressLabel, Divider, Heading, HStack, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { Card } from "@components/Card";
import { currencyFormatter } from "@shared/utils/currencyFormatter";
import { getProgressColor, getProgressValue } from "@shared/utils/planUtils";
import { MouseEvent } from "react";
import { RxPlus } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { DepositForm } from "../../DepositForm";
import { PlanCardProps } from "./PlanCard.types";

const actionButtonCommonProps: ButtonProps = {
  flex: 1,
  size: "sm",
  color: "blackAlpha.800",
  _focus: { shadow: "none" }
}

export function PlanCard(props: PlanCardProps) {
  const depositFormDisclosure = useDisclosure()
  const navigate = useNavigate()

  const progress = getProgressValue(props.plan.currentValue, props.plan.plannedValue)

  function handleDeposit(event: MouseEvent) {
    event.stopPropagation()
    depositFormDisclosure.onOpen()
  }

  return (
    <>
      <Card
        p={[3, 4]}
        cursor="pointer"
        transition=".3s"
        _hover={{ shadow: "md" }}
        onClick={() => navigate(`/plans/${props.plan.id}`)}
      >
        <HStack justifyContent="space-between" gap={1}>
          <VStack alignItems="stretch">
            <Heading fontSize={["md", "lg"]} fontWeight="medium" mb={1}>
              {props.plan.name}
            </Heading>

            <Text fontSize={["xs", "sm"]} color="gray.500" style={{ marginTop: 0 }}>
              {currencyFormatter.format(props.plan.currentValue)} de {currencyFormatter.format(props.plan.plannedValue)}
            </Text>
          </VStack>

          <CircularProgress
            value={progress}
            color={getProgressColor(progress)}
            trackColor="gray.200"
            capIsRound
          >
            <CircularProgressLabel>
              {progress >= 100 ? "100%" : `${Math.floor(progress)}%`}
            </CircularProgressLabel>
          </CircularProgress>
        </HStack>

        <HStack flex={1} my={2}>
          <Text fontSize="xs" color="gray.500" whiteSpace="nowrap">
            {props.plan.dueDate ? (
              `Até ${new Intl.DateTimeFormat("pt-BR").format(props.plan.dueDate)}`
            ) : (
              "Sem data limite"
            )}
          </Text>

          <Divider variant="dashed" borderWidth={1} borderColor="gray.300" />
        </HStack>

        <HStack>
          <Button
            {...actionButtonCommonProps}
            leftIcon={<RxPlus strokeWidth={0.8} />}
            onClick={handleDeposit}
          >
            Registrar
          </Button>
        </HStack>
      </Card>

      <DepositForm
        isOpen={depositFormDisclosure.isOpen}
        onClose={depositFormDisclosure.onClose}
        plan={props.plan}
      />
    </>
  )
}