import { useAuth } from "@contexts/AuthContext";
import { useToast } from "@hooks/useToast";
import { fauna } from "@services/faunadb";
import { TransactionRecurrence } from "@shared/enums/transactionRecurrence";
import { TransactionStatus } from "@shared/enums/transactionStatus";
import { formatDateForFauna } from "@shared/utils/formatDateForFauna";
import { query as q } from "faunadb";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaunaDBTransaction,
  NewTransactionFormData,
} from "./NewTransaction.types";

export function useNewTransaction() {
  const [categorySuggestions, setCategorySuggestions] = useState<string[]>();
  const [paymentMethodSuggestions, setPaymentMethodSuggestions] =
    useState<string[]>();
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const getCategorieSuggestions = useCallback(async () => {
    const categories = await fauna.query<{ data: string[] }>(
      q.Paginate(
        q.Distinct(
          q.Match(q.Index("categories_of_transactions_by_user_id"), user!.id)
        )
      )
    );
    setCategorySuggestions(categories.data);
  }, []);

  const getPaymentMethodSuggestions = useCallback(async () => {
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
    setPaymentMethodSuggestions(paymentMethods.data);
  }, []);

  useEffect(() => {
    getCategorieSuggestions();
    getPaymentMethodSuggestions();
  }, []);

  async function handleSave(data: NewTransactionFormData) {
    const transaction = data;
    if (transaction.recurrence !== TransactionRecurrence.UNICO) {
      transaction.status = TransactionStatus.PENDENTE;
    }

    try {
      const transactionRefId = await persistTransaction(transaction);

      if (transaction.recurrence === TransactionRecurrence.PARCELADO) {
        await persistInstallments(transaction, transactionRefId);
      }

      toast({
        title: "Sucesso!",
        description: "Sua transacão foi criada.",
        status: "success",
      });
      navigate("/dashboard");
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

      installments.push({
        name: transaction.name,
        amount: transaction.amount / transaction.installmentAmount!,
        category: transaction.category,
        paymentMethod: transaction.paymentMethod,
        type: transaction.type,
        status: TransactionStatus.PENDENTE,
        dueDate: q.Date(formatDateForFauna(dueDate)),
        userId: user?.id,
        transactionRefId,
      });
    }

    return installments;
  }

  return {
    handleSave,
    categorySuggestions,
    paymentMethodSuggestions,
  };
}
