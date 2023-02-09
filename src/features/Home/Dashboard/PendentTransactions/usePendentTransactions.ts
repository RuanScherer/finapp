import { query as q } from "faunadb";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { useToast } from "../../../../hooks/useToast";
import { fauna } from "../../../../services/faunadb";
import { TransactionsStatus } from "../../../../shared/enums/transactionStatus";
import { formatDateForFauna } from "../../../../shared/utils/formatDateForFauna";
import { getRangeDatesForCurrentMonth } from "../../../../shared/utils/getRangeDatesForCurrentMonth";
import { LastPendentTransactionByMonthQueryReturn, Transaction } from "./PendentTransactions.types";

export function usePendentTransactions() {
  const [lastPendentTransactions, setLastPendentTransactions] = useState<Transaction[]>()
  const { user } = useAuth()
  const toast = useToast()

  const loadLastPendentTransactions = useCallback(async () => {
    const { fromDate, toDate } = getRangeDatesForCurrentMonth()

    const transactions = await fauna.query<LastPendentTransactionByMonthQueryReturn>(
      q.Map(
        q.Paginate(
          q.Range(
            q.Filter(
              q.Match(
                q.Index("last_pendent_transactions_by_month"),
                user!.id,
                TransactionsStatus.PENDENTE
              ),
              q.Lambda(
                ["dueDate", "ref", "amount", "category", "name", "type", "recurrence"],
                q.Not(q.Equals(q.Var("recurrence"), "PARCELADO"))
              )
            ),
            q.Date(formatDateForFauna(fromDate)),
            q.Date(formatDateForFauna(toDate))
          ),
          { size: 3 }
        ),
        q.Lambda(
          ["dueDate", "ref", "amount", "category", "name", "type", "recurrence"],
          {
            dueDate: q.Var("dueDate"),
            ref: q.Var("ref"),
            amount: q.Var("amount"),
            category: q.Var("category"),
            name: q.Var("name"),
            type: q.Var("type"),
          }
        )
      )
    )
    const formattedTransactions = transactions.data.map(transaction => ({
      ...transaction,
      dueDate: transaction.dueDate.date
    }))
    setLastPendentTransactions(formattedTransactions)
  }, [])

  useEffect(() => {
    try {
      loadLastPendentTransactions()
    } catch {
      toast({
        title: "Erro ao buscar dados.",
        description: "Ocorreu um erro ao buscar alguns dados para o dashboard. Por favor, tente recarregar a página.",
        status: "error"
      })
    }
  }, [])

  return { lastPendentTransactions }
}