export interface ConfirmPlanRemovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  plan: {
    name: string;
  }
}