import { List } from "@chakra-ui/react";
import { PendingInstallmentCard } from "./PendingInstallmentCard";
import { PendingInstallmentsListProps } from "./PendingInstallmentsList.types";

export function PendingInstallmentsList(props: PendingInstallmentsListProps) {
  return (
    <List flexDirection="column">
      {props.pendingInstallments.map((pendingInstallment) => (
        <PendingInstallmentCard pendingInstallment={pendingInstallment} key={pendingInstallment.name} /> // mudar key
      ))}
    </List>
  )
}