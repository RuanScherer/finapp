import { useAuth } from "@contexts/AuthContext";
import { useToast } from "@hooks/useToast";
import { fauna } from "@services/faunadb";
import { queryClient } from "@services/queryClient";
import { TransactionRecurrence } from "@shared/enums/transactionRecurrence";
import { TransactionStatus } from "@shared/enums/transactionStatus";
import { formatDateForFauna } from "@shared/utils/formatDateForFauna";
import { query as q } from "faunadb";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  FaunaDBTransaction,
  NewTransactionFormData,
} from "./NewTransaction.types";

export function useNewTransaction() {
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const { data: categorySuggestions } = useQuery(
    "categorySuggestions",
    async () => {
      const categories = await fauna.query<{ data: string[] }>(
        q.Paginate(
          q.Distinct(
            q.Match(q.Index("categories_of_transactions_by_user_id"), user!.id)
          )
        )
      );
      return categories.data;
    },
    {
      staleTime: 10 * 60 * 1000, // 10 minutes
    }
  );

  const { data: paymentMethodSuggestions } = useQuery(
    "paymentMethodSuggestions",
    async () => {
      const paymentMethods = await fauna.query<{ data: string[] }>(
        q.Paginate(
          q.Distinct(
            q.Match(
              q.Index("payment_methods_of_transactions_by_user_id"),
              user!.id
            )
          )
        )
      );
      return paymentMethods.data;
    },
    {
      staleTime: 10 * 60 * 1000, // 10 minutes
    }
  );

  async function handleSave(data: NewTransactionFormData) {
    const transaction = data as NewTransactionFormData;

    // this field is used only for user experience in the form and should not be persisted
    delete transaction.installmentValue;

    if (transaction.recurrence !== TransactionRecurrence.UNIQUE) {
      transaction.status = TransactionStatus.PENDENT;
    }

    try {
      const transactionRefId = await persistTransaction(transaction);

      if (transaction.recurrence !== TransactionRecurrence.UNIQUE) {
        await persistInstallments(transaction, transactionRefId);
      }

      queryClient.invalidateQueries();
      toast({
        title: "Sucesso!",
        description: "Sua transacão foi criada.",
        status: "success",
      });
      navigate(-1);
    } catch {
      toast({
        title: "Erro ao criar transação.",
        description:
          "Ocorreu um erro ao criar sua transação. Por favor, tente novamente.",
        status: "error",
      });
    }
  }

  async function persistTransaction(data: NewTransactionFormData) {
    const transaction = await fauna.query<FaunaDBTransaction>(
      q.Create(q.Collection("transactions"), {
        data: {
          ...data,
          dueDate: q.Date(formatDateForFauna(data.dueDate)),
          userId: user!.id,
        },
      })
    );
    return transaction.ref.id;
  }

  async function persistInstallments(
    transaction: NewTransactionFormData,
    transactionRefId: string
  ) {
    const installments = createInstallmentsFromTransaction(
      transaction,
      transactionRefId
    );
    await fauna.query(
      q.Map(
        installments,
        q.Lambda(
          "installment",
          q.Create(q.Collection("transactions"), { data: q.Var("installment") })
        )
      )
    );
  }

  function createInstallmentsFromTransaction(
    transaction: NewTransactionFormData,
    transactionRefId: string
  ) {
    const installments = [];
    let baseDueDateMonth = transaction.dueDate.getMonth();

    for (let i = 1; i <= transaction.installmentAmount!; i++) {
      const dueDate = new Date(transaction.dueDate);
      dueDate.setMonth(baseDueDateMonth);

      if (dueDate.getMonth() > 11) {
        dueDate.setFullYear(dueDate.getFullYear() + 1);
        dueDate.setMonth(0);
        baseDueDateMonth = 0;
      } else {
        baseDueDateMonth++;
      }

      const installment = {
        name: transaction.name,
        amount:
          transaction.recurrence === TransactionRecurrence.INSTALLMENT
            ? transaction.amount / transaction.installmentAmount!
            : transaction.amount,
        category: transaction.category,
        paymentMethod: transaction.paymentMethod,
        type: transaction.type,
        status: TransactionStatus.PENDENT,
        dueDate: q.Date(formatDateForFauna(dueDate)),
        recurrence: transaction.recurrence,
        userId: user!.id,
        transactionRefId,
      } as any;
      if (transaction.recurrence === TransactionRecurrence.INSTALLMENT) {
        installment.name = `${transaction.name} (${i}/${transaction.installmentAmount})`;
        installment.installmentOrder = i;
      }

      installments.push(installment);
    }

    return installments;
  }

  return {
    handleSave,
    categorySuggestions,
    paymentMethodSuggestions,
  };
}
