import { CircularProgress, CircularProgressLabel, Heading, HStack, ListItem, Text, VStack } from "@chakra-ui/react";
import { PendingInstallmentCardProps } from "./PendingInstallmentCard.types";

export function PendingInstallmentCard(props: PendingInstallmentCardProps) {
  const progress =
    100 -
    (props.pendingInstallment.pending_installment_amount /
      props.pendingInstallment.installment_amount) *
    100;

  return (
    <ListItem
      w="full"
      p={3}
      borderBottomWidth={props.hasBottomBorder ? 1 : 0}
      borderBottomColor="gray.200"
      cursor="pointer"
      borderTopRadius="xl"
      transition=".3s"
      _hover={{ bgColor: "gray.50" }}
    >
      <HStack w="full" justifyContent="space-between">
        <VStack flex={1} gap={0.5} alignItems="start">
          <Heading
            fontSize="md"
            fontWeight="medium"
            lineHeight="base"
          >
            {props.pendingInstallment.name}
          </Heading>

          <Text
            fontSize="sm"
            lineHeight="none"
            style={{ marginTop: 0 }}
          >
            {props.pendingInstallment.pending_installment_amount} parcelas pendentes de {props.pendingInstallment.installment_amount}
          </Text>
        </VStack>

        <CircularProgress value={progress} color="green.300" capIsRound>
          <CircularProgressLabel>{Math.floor(progress)}%</CircularProgressLabel>
        </CircularProgress>
      </HStack>
    </ListItem>
  )
}