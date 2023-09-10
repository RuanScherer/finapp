
export interface PlanDepositsListProps {
  deposits?: {
    [date: string]: Array<Deposit>
  }
}

export interface Deposit {
  id: number
  value: number
  description: string | null
  createdAt: Date | string
  planId: number
}
