import { useAuth } from "@contexts/AuthContext";
import { useToast } from "@hooks/useToast";
import { queryClient } from "@services/queryClient";
import { supabase } from "@services/supabase";
import { toApplicationTransaction } from "@shared/mappers/transactionMapper";
import { getRangeDatesForCurrentMonth } from "@shared/utils/getRangeDates";
import { createContext, useContext, useState } from "react";
import { QueryFunctionContext, useMutation, useQuery } from "react-query";
import {
  GetTransactionsViewByMonthParams,
  Transaction,
  TransactionsViewContextData,
  TransactionsViewContextProviderProps,
  UpdateTransactionStatusByIdParams,
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

  const { data: transactions, refetch: refetchTransactionsViewByMonth } =
    useQuery(
      ["transactionsByMonth", transactionsQueryDates],
      fetchTransactionsViewByMonth,
      {
        staleTime: 10 * 60 * 1000, // 10 minutes
      }
    );

  const updateTransactionStatusByIdMutation = useMutation<
    void,
    unknown,
    UpdateTransactionStatusByIdParams
  >(doUpdateTransactionStatusById, {
    onSuccess: (_data, variables) => {
      const originalTransaction = transactions!.find(
        (transaction) => transaction.id === variables.id
      );
      const updatedTransaction: Transaction = {
        ...originalTransaction!,
        status: variables.status,
      };
      queryClient.setQueryData(
        ["transactionsByMonth", transactionsQueryDates],
        (oldData?: Transaction[]) => {
          const newData = oldData?.map((transaction) => {
            if (transaction.id === variables.id) {
              return updatedTransaction;
            }
            return transaction;
          });
          return newData ?? [];
        }
      );
      queryClient.invalidateQueries({
        predicate: (query) =>
          String(query.queryKey[0]).startsWith("dashboard") ||
          String(query.queryKey).startsWith("dashboard"),
      });
      queryClient.invalidateQueries([
        "transaction",
        String(updatedTransaction.id),
      ]);
    },
  });

  async function fetchTransactionsViewByMonth({
    queryKey,
  }: QueryFunctionContext<any>) {
    const [_key, { fromDate, toDate }] = queryKey;

    const { error, data } = await supabase.rpc("get_transactions_by_month", {
      p_user_id: user!.id,
      p_from_date: fromDate,
      p_to_date: toDate,
    });

    if (error) {
      toast({
        title: "Erro ao buscar transações.",
        description:
          "Ocorreu um erro ao buscar as transações do mês. Por favor, tente recarregar a página.",
        status: "error",
      });
      throw new Error("Erro ao buscar transações.");
    }
    return data.map(toApplicationTransaction);
  }

  function getTransactionsViewByMonth({
    fromDate,
    toDate,
  }: GetTransactionsViewByMonthParams) {
    setTransactionsQueryDates({ fromDate, toDate });
  }

  async function doUpdateTransactionStatusById({
    id,
    status,
  }: UpdateTransactionStatusByIdParams) {
    const { error } = await supabase
      .from("transactions")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast({
        title: "Erro ao atualizar transação.",
        description:
          "Não foi possível atualizar o status da transação no momento. Por favor, tente novamente.",
        status: "error",
      });
      throw new Error("Erro ao atualizar transação.");
    }
  }

  async function updateTransactionStatusById({
    id,
    status,
  }: UpdateTransactionStatusByIdParams) {
    await updateTransactionStatusByIdMutation.mutateAsync({ id, status });
  }

  async function refreshTransactionsViewByMonth() {
    await refetchTransactionsViewByMonth();
  }

  return (
    <TransactionsViewContext.Provider
      value={{
        transactions,
        getTransactionsViewByMonth,
        updateTransactionStatusById,
        refreshTransactionsViewByMonth,
        transactionsQueryDates,
      }}
    >
      {children}
    </TransactionsViewContext.Provider>
  );
}

export function useTransactionsView() {
  return useContext(TransactionsViewContext);
}
