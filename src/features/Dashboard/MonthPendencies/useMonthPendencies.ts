import { query as q } from "faunadb"
import { useCallback, useEffect, useState } from "react"
import { useAuth } from "../../../contexts/AuthContext"
import { useToast } from "../../../hooks/useToast"
import { fauna } from "../../../services/faunadb"
import { TransactionType } from "../../../shared/enums/transactionType"
import { formatDateForFauna } from "../../../shared/utils/formatDateForFauna"
import { getRangeDatesForCurrentMonth } from "../../../shared/utils/getRangeDatesForCurrentMonth"
import { GetMonthPendenciesQueryReturn, GetMonthPendenciesStatParams } from "./MonthPendencies.types"

export function useMonthPendencies() {
  const [pendentAmountToReceive, setPendentAmountToReceive] = useState<number>()
  const [pendentAmountToPay, setPendentAmountToPay] = useState<number>()
  const { user } = useAuth()
  const toast = useToast()

  const getMonthBalanceStat = useCallback(async ({
    transactionType,
    userId,
    fromDate,
    toDate
  }: GetMonthPendenciesStatParams) => {
    const fromDateFormatted = q.Date(formatDateForFauna(fromDate))
    const toDateFormatted = q.Date(formatDateForFauna(toDate))
    const result = await fauna.query<GetMonthPendenciesQueryReturn>(
      q.Call(
        "get_month_pendent_balance",
        transactionType,
        userId,
        fromDateFormatted,
        toDateFormatted
      )
    )
    return result.data[0]
  }, [])

  const loadBalanceData = useCallback(async () => {
    const { fromDate, toDate } = getRangeDatesForCurrentMonth()

    const amountToPay = await getMonthBalanceStat({
      transactionType: TransactionType.DESPESA,
      userId: user!.id,
      fromDate,
      toDate
    })
    setPendentAmountToPay(amountToPay)
    const amountToReceive = await getMonthBalanceStat({
      transactionType: TransactionType.RECEITA,
      userId: user!.id,
      fromDate,
      toDate
    })
    setPendentAmountToReceive(amountToReceive)
  }, [])
  
  useEffect(() => {
    try {
      loadBalanceData()
    } catch {
      toast({
        title: "Erro ao buscar dados.",
        description: "Ocorreu um erro ao buscar alguns dados para o dashboard. Por favor, tente recarregar a página.",
        status: "error"
      })
    }
  }, [])

  return { pendentAmountToReceive, pendentAmountToPay }
}
