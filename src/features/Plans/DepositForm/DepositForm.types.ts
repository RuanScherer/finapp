export interface DepositFormProps {
  plan: {
    id: number;
    name: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export interface CreateDepositFormData {
  value: number;
  description?: string;
}