import { List } from "@chakra-ui/react";
import { PendingInstallmentCard } from "./PendingInstallmentCard";
import { PendingInstallmentsListProps } from "./PendingInstallmentsList.types";

export function PendingInstallmentsList(props: PendingInstallmentsListProps) {
  return (
    <List flexDirection="column">
      {props.pendingInstallments.map((pendingInstallment, index) => (
        <PendingInstallmentCard
          pendingInstallment={pendingInstallment}
          hasBottomBorder={index !== props.pendingInstallments.length - 1}
          key={pendingInstallment.name}
        />
      ))}
    </List>
  )
}