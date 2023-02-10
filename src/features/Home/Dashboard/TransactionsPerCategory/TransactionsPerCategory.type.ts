export interface TransactionsPerCategory {
  categoryName: string
  count: number
}

export interface GetTransactionsPerCategoryQueryResult {
  data: TransactionsPerCategory[]
}
