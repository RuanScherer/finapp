import { useAuth } from "@contexts/AuthContext";
import { useToast } from "@hooks/useToast";
import { fauna } from "@services/faunadb";
import { formatDateForFauna } from "@shared/utils/formatDateForFauna";
import { getRangeDatesForCurrentMonth } from "@shared/utils/getRangeDatesForCurrentMonth";
import { query as q } from "faunadb";
import { useCallback, useEffect, useState } from "react";
import {
  GetTransactionsPerCategoryQueryResult,
  TransactionsPerCategory,
} from "./TransactionsPerCategory.type";

export function useTransactionsPerCategory() {
  const [transactionsPerCategory, setTransactionsPerCategory] =
    useState<TransactionsPerCategory[]>();
  const { user } = useAuth();
  const toast = useToast();

  const loadTransactionsPerCategory = useCallback(async () => {
    const { fromDate, toDate } = getRangeDatesForCurrentMonth();
    const result = await fauna.query<GetTransactionsPerCategoryQueryResult>(
      q.Call(
        "get_transactions_per_category",
        user!.id,
        q.Date(formatDateForFauna(fromDate)),
        q.Date(formatDateForFauna(toDate))
      )
    );
    setTransactionsPerCategory(result.data);
  }, []);

  useEffect(() => {
    try {
      loadTransactionsPerCategory();
    } catch {
      toast({
        title: "Erro ao buscar dados.",
        description:
          "Ocorreu um erro ao buscar alguns dados para o dashboard. Por favor, tente recarregar a página.",
        status: "error",
      });
    }
  }, []);

  return { transactionsPerCategory };
}
