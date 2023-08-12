export interface ConfirmDepositRemovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  deposit: {
    description?: string;
    value: number;
  }
}