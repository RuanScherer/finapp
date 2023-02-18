import { TransactionRecurrence } from "../../../shared/enums/transactionRecurrence"
import { TransactionsStatus } from "../../../shared/enums/transactionStatus"
import { TransactionType } from "../../../shared/enums/transactionType"

export type NewTransactionFormData = {
  name: string
  amount: number
  category: string
  paymentMethod: string
  type: TransactionType
  status: TransactionsStatus
  recurrence: TransactionRecurrence
  dueDate: Date
  installmentAmount?: number
}

export type FaunaDBTransaction = {
  ref: {
    id: string
  },
  data: NewTransactionFormData & {
    userId: string
  }
}
