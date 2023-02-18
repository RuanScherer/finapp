import { TransactionType } from "../../../shared/enums/transactionType"

export interface Transaction {
  dueDate: Date
  ref: {
    id: string
  }
  amount: number
  category: string
  name: string
  type: TransactionType
}

export interface LastPendentTransactionByMonthQueryReturn {
  data: Array<{
    dueDate: {
      date: Date
    }
    ref: {
      id: string
    }
    amount: number
    category: string
    name: string
    type: TransactionType
  }>
}
