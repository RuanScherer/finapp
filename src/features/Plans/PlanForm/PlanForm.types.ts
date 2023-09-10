export type PlanFormProps = {
  isOpen: boolean;
  onClose: () => void;
} & ({
  isEditing?: false;
} | {
  isEditing: true;
  plan: Plan
})

export interface Plan {
  id: number;
  name: string;
  plannedValue: number;
  currentValue: number;
  dueDate?: Date | null;
}

export interface CreatePlanFormData {
  name: string;
  plannedValue: number;
  dueDate?: string | Date;
}
