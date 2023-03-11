import { useAuth } from "@contexts/AuthContext";
import { useToast } from "@hooks/useToast";
import { fauna } from "@services/faunadb";
import { TransactionType } from "@shared/enums/transactionType";
import { formatDateForFauna } from "@shared/utils/formatDateForFauna";
import { getRangeDatesForCurrentMonth } from "@shared/utils/getRangeDatesForCurrentMonth";
import { query as q } from "faunadb";
import { useCallback, useEffect, useState } from "react";
import { GetMonthStatParams, GetMonthStatQueryReturn } from "./MonthStat.types";

export function useMonthStat(type: TransactionType) {
  const [amount, setAmount] = useState<number>();
  const { user } = useAuth();
  const toast = useToast();

  const getMonthStat = useCallback(
    async ({
      transactionType,
      userId,
      fromDate,
      toDate,
    }: GetMonthStatParams) => {
      const fromDateFormatted = q.Date(formatDateForFauna(fromDate));
      const toDateFormatted = q.Date(formatDateForFauna(toDate));
      const result = await fauna.query<GetMonthStatQueryReturn>(
        q.Call(
          "get_month_balance",
          transactionType,
          userId,
          fromDateFormatted,
          toDateFormatted
        )
      );
      return result.data[0];
    },
    []
  );

  const loadStatData = useCallback(async () => {
    const { fromDate, toDate } = getRangeDatesForCurrentMonth();
    const amount = await getMonthStat({
      transactionType: type,
      userId: user!.id,
      fromDate,
      toDate,
    });
    setAmount(amount);
  }, []);

  useEffect(() => {
    try {
      loadStatData();
    } catch {
      toast({
        title: "Erro ao buscar dados.",
        description:
          "Ocorreu um erro ao buscar alguns dados para o dashboard. Por favor, tente recarregar a página.",
        status: "error",
      });
    }
  }, []);

  return { amount };
}
