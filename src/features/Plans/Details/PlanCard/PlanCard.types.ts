import { CardProps } from "@components/Card/Card";

export interface PlanCardProps extends Omit<CardProps, "children"> {
  plan?: {
    id: number
    name: string
    plannedValue: number
    currentValue: number
    dueDate?: Date
  }
}