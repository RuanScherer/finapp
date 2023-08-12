import { SimpleGrid } from "@chakra-ui/react";
import { PlanCard } from "../PlanCard";
import { PlansGridProps } from "./PlansGrid.types";

export function PlansGrid(props: PlansGridProps) {
  return (
    <SimpleGrid columns={[1, 1, 2, 3]} gap={4}>
      {props.plans.map((plan) => (
        <PlanCard plan={plan} />
      ))}
    </SimpleGrid>
  )
}