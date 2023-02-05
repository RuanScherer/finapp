export type NewTransactionFormData = {
  name: string
  amount: number
  category: string
  paymentMethod: string
  type: string
  status: string
  recurrence: string
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
