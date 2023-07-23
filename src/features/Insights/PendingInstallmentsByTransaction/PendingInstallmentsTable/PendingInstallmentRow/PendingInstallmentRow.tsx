import { HStack, Progress, Td, Text, Tr } from "@chakra-ui/react";
import { PendingInstallmentRowProps } from "./PendingInstallmentRow.types";

export function PendingInstallmentRow(props: PendingInstallmentRowProps) {
  const progress =
    100 -
    (props.installment.pending_installment_amount /
      props.installment.installment_amount) *
    100;

  return (
    <Tr>
      <Td>{props.installment.name}</Td>
      <Td>{props.installment.pending_installment_amount}</Td>
      <Td>{props.installment.installment_amount}</Td>
      <Td>
        <HStack>
          <Text fontSize={["xs", "xs", "sm"]}>{Math.floor(progress)}%</Text>
          <Progress
            flex={1}
            value={progress}
            borderRadius="full"
            colorScheme="primary"
          />
        </HStack>
      </Td>
    </Tr>
  );
}
