import { TransactionType } from "@shared/enums/transactionType";

export interface MonthStatProps {
  type: TransactionType;
}

export interface GetMonthStatQueryReturn {
  data: number[];
}

export interface GetMonthPendenciesQueryReturn {
  data: number[];
}
