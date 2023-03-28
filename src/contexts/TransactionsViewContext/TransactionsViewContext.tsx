import { useAuth } from "@contexts/AuthContext";
import { useToast } from "@hooks/useToast";
import { fauna } from "@services/faunadb";
import { queryClient } from "@services/queryClient";
import { formatDateForFauna } from "@shared/utils/formatDateForFauna";
import { getRangeDatesForCurrentMonth } from "@shared/utils/getRangeDates";
import { query as q } from "faunadb";
import { createContext, useContext, useState } from "react";
import { QueryFunctionContext, useMutation, useQuery } from "react-query";
import {
  GetTransactionsViewByMonthParams,
  GetTransactionsViewByMonthReturn,
  Transaction,
  TransactionsViewContextData,
  TransactionsViewContextProviderProps,
  UpdateTransactionStatusByRefIdParams,
} from "./TransactionsViewContext.types";

const TransactionsViewContext = createContext<TransactionsViewContextData>(
  {} as TransactionsViewContextData
);

export function TransactionsViewContextProvider({
  children,
}: TransactionsViewContextProviderProps) {
  const [transactionsQueryDates, setTransactionsQueryDates] = useState<{
    fromDate: Date;
    toDate: Date;
  }>(getRangeDatesForCurrentMonth());
  const { user } = useAuth();
  const toast = useToast();

  const { data: transactions } = useQuery(
    ["transactionsByMonth", transactionsQueryDates],
    fetchTransactionsViewByMonth,
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  const updateTransactionStatusByRefIdMutation = useMutation<
    void,
    unknown,
    UpdateTransactionStatusByRefIdParams
  >(doUpdateTransactionStatusByRefId, {
    onSuccess: (_data, variables) => {
      const originalTransaction = transactions!.find(
        (transaction) => transaction.ref.id === variables.refId
      );
      const updatedTransaction: Transaction = {
        ...originalTransaction!,
        status: variables.status,
      };
      queryClient.setQueryData(
        ["transactionsByMonth", transactionsQueryDates],
        (oldData?: Transaction[]) => {
          const newData = oldData?.map((transaction) => {
            if (transaction.ref.id === variables.refId) {
              return updatedTransaction;
            }
            return transaction;
          });
          return newData ?? [];
        }
      );
      queryClient.invalidateQueries({
        predicate: (query) => String(query.queryKey[0]).startsWith("dashboard"),
      });
    },
  });

  async function fetchTransactionsViewByMonth({
    queryKey,
  }: QueryFunctionContext<any>) {
    const [_key, { fromDate, toDate }] = queryKey;

    const fromDateFormatted = q.Date(formatDateForFauna(fromDate));
    const toDateFormatted = q.Date(formatDateForFauna(toDate));

    try {
      const result = await fauna.query<GetTransactionsViewByMonthReturn>(
        q.Call(
          "get_transactions_view_by_month",
          user!.id,
          fromDateFormatted,
          toDateFormatted
        )
      );
      return result.data;
    } catch {
      toast({
        title: "Erro ao buscar transações.",
        description:
          "Ocorreu um erro ao buscar as transações do mês. Por favor, tente recarregar a página.",
        status: "error",
      });
    }
  }

  function getTransactionsViewByMonth({
    fromDate,
    toDate,
  }: GetTransactionsViewByMonthParams) {
    setTransactionsQueryDates({ fromDate, toDate });
  }

  async function doUpdateTransactionStatusByRefId({
    refId,
    status,
  }: UpdateTransactionStatusByRefIdParams) {
    try {
      await fauna.query(
        q.Update(q.Ref(q.Collection("transactions"), refId), {
          data: {
            status,
          },
        })
      );
    } catch {
      toast({
        title: "Erro ao atualizar transação.",
        description:
          "Não foi possível atualizar o status da transação no momento. Por favor, tente novamente.",
        status: "error",
      });
      throw new Error("Erro ao atualizar transação.");
    }
  }

  async function updateTransactionStatusByRefId({
    refId,
    status,
  }: UpdateTransactionStatusByRefIdParams) {
    await updateTransactionStatusByRefIdMutation.mutateAsync({ refId, status });
  }

  return (
    <TransactionsViewContext.Provider
      value={{
        transactions,
        getTransactionsViewByMonth,
        updateTransactionStatusByRefId,
      }}
    >
      {children}
    </TransactionsViewContext.Provider>
  );
}

export function useTransactionsView() {
  return useContext(TransactionsViewContext);
}
