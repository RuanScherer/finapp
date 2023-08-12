export interface PlanCardProps {
  plan: Plan;
}

interface Plan {
  id: number;
  name: string;
  plannedValue: number;
  currentValue: number;
  dueDate?: Date | null;
}