import { Transaction } from "../TransactionsList.types"

export interface TransactionDrawerProps {
  isOpen: boolean
  onClose: () => void
  transaction?: Transaction
}