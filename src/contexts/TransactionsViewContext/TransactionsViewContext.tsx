import { useAuth } from "@contexts/AuthContext";
import { useToast } from "@hooks/useToast";
import { fauna } from "@services/faunadb";
import { TransactionStatus } from "@shared/enums/transactionStatus";
import { formatDateForFauna } from "@shared/utils/formatDateForFauna";
import { getRangeDatesForCurrentMonth } from "@shared/utils/getRangeDatesForCurrentMonth";
import { query as q } from "faunadb";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  GetTransactionsViewByMonthParams,
  GetTransactionsViewByMonthReturn,
  Transaction,
  TransactionsViewContextData,
  TransactionsViewContextProviderProps,
} from "./TransactionsViewContext.types";

const TransactionsViewContext = createContext<TransactionsViewContextData>(
  {} as TransactionsViewContextData
);

export function TransactionsViewContextProvider({
  children,
}: TransactionsViewContextProviderProps) {
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
        title: "Erro ao buscar transações.",
        description:
          "Ocorreu um erro ao buscar as transações do mês. Por favor, tente recarregar a página.",
        status: "error",
      });
    }
  }, []);

  async function updateTransactionStatusByRefId(
    refId: string,
    status: TransactionStatus
  ) {
    try {
      await fauna.query(
        q.Update(q.Ref(q.Collection("transactions"), refId), {
          data: {
            status,
          },
        })
      );
      const originalTransaction = transactions!.find(
        (transaction) => transaction.ref.id === refId
      );
      const updatedTransaction: Transaction = {
        ...originalTransaction!,
        status,
      };
      setTransactions((transactions) =>
        transactions!.map((transaction) => {
          if (transaction.ref.id === refId) {
            return updatedTransaction;
          }
          return transaction;
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

  return (
    <TransactionsViewContext.Provider
      value={{ transactions, updateTransactionStatusByRefId }}
    >
      {children}
    </TransactionsViewContext.Provider>
  );
}

export function useTransactionsView() {
  return useContext(TransactionsViewContext);
}
