import { TransactionType } from "../../../../shared/enums/transactionType"

export interface GetMonthPendenciesStatParams {
  transactionType: TransactionType
  userId: string
  fromDate: Date
  toDate: Date
}

export interface GetMonthPendenciesQueryReturn {
  data: number[]
}
