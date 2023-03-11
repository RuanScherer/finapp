import { useAuth } from "@contexts/AuthContext";
import { useToast } from "@hooks/useToast";
import { fauna } from "@services/faunadb";
import { formatDateForFauna } from "@shared/utils/formatDateForFauna";
import { getRangeDatesForCurrentMonth } from "@shared/utils/getRangeDatesForCurrentMonth";
import { query as q } from "faunadb";
import { useCallback, useEffect, useState } from "react";
import {
  GetTransactionsViewByMonthParams,
  GetTransactionsViewByMonthReturn,
  Transaction,
} from "./TransactionsView.types";

export function useTransactionsView() {
  const [transactions, setTransactions] = useState<Transaction[]>();
  const { user } = useAuth();
  const toast = useToast();

  const getTransactionsViewByMonth = useCallback(
    async ({ userId, fromDate, toDate }: GetTransactionsViewByMonthParams) => {
      const fromDateFormatted = q.Date(formatDateForFauna(fromDate));
      const toDateFormatted = q.Date(formatDateForFauna(toDate));
      const result = await fauna.query<GetTransactionsViewByMonthReturn>(
        q.Call(
          "get_transactions_view_by_month",
          userId,
          fromDateFormatted,
          toDateFormatted
        )
      );
      return result.data;
    },
    []
  );

  const loadTransactions = useCallback(async () => {
    const { fromDate, toDate } = getRangeDatesForCurrentMonth();

    const transactions = await getTransactionsViewByMonth({
      userId: user!.id,
      fromDate,
      toDate,
    });
    setTransactions(transactions);
  }, []);

  useEffect(() => {
    try {
      loadTransactions();
    } catch {
      toast({
        title: "Erro ao buscar dados.",
        description:
          "Ocorreu um erro ao buscar alguns dados para o dashboard. Por favor, tente recarregar a página.",
        status: "error",
      });
    }
  }, []);

  return { transactions };
}
