import { useAuth } from "@contexts/AuthContext";
import { useToast } from "@hooks/useToast";
import { fauna } from "@services/faunadb";
import { formatDateForFauna } from "@shared/utils/formatDateForFauna";
import { getRangeDatesForCurrentMonth } from "@shared/utils/getRangeDatesForCurrentMonth";
import { query as q } from "faunadb";
import { useCallback, useEffect, useState } from "react";
import {
  LastPendentTransactionByMonthQueryReturn,
  Transaction,
} from "./PendentTransactions.types";

export function usePendentTransactions() {
  const [lastPendentTransactions, setLastPendentTransactions] =
    useState<Transaction[]>();
  const { user } = useAuth();
  const toast = useToast();

  const loadLastPendentTransactions = useCallback(async () => {
    const { fromDate, toDate } = getRangeDatesForCurrentMonth();

    const transactions =
      await fauna.query<LastPendentTransactionByMonthQueryReturn>(
        q.Call(
          "get_pendent_transactions",
          user!.id,
          q.Date(formatDateForFauna(fromDate)),
          q.Date(formatDateForFauna(toDate))
        )
      );
    const formattedTransactions = transactions.data.map((transaction) => ({
      ...transaction,
      dueDate: transaction.dueDate.date,
    }));
    setLastPendentTransactions(formattedTransactions);
  }, []);

  useEffect(() => {
    try {
      loadLastPendentTransactions();
    } catch {
      toast({
        title: "Erro ao buscar dados.",
        description:
          "Ocorreu um erro ao buscar alguns dados para o dashboard. Por favor, tente recarregar a página.",
        status: "error",
      });
    }
  }, []);

  return { lastPendentTransactions };
}
