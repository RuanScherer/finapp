import { TransactionType } from "../../../../shared/enums/transactionType"

export interface MonthStatProps {
  type: TransactionType
}

export interface GetMonthStatParams {
  transactionType: TransactionType
  userId: string
  fromDate: Date
  toDate: Date
}

export interface GetMonthStatQueryReturn {
  data: number[]
}
