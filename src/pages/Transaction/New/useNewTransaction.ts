import { useAuth } from "@contexts/AuthContext";
import { useToast } from "@hooks/useToast";
import { queryClient } from "@services/queryClient";
import { supabase } from "@services/supabase";
import { TransactionRecurrence } from "@shared/enums/transactionRecurrence";
import { TransactionStatus } from "@shared/enums/transactionStatus";
import { useNavigate } from "react-router-dom";
import { NewTransactionFormData } from "./NewTransaction.types";

export function useNewTransaction() {
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  async function handleSave(transaction: NewTransactionFormData) {
    // this field is used only for user experience in the form and should not be persisted
    delete transaction.installmentValue;

    if (transaction.recurrence !== TransactionRecurrence.UNIQUE) {
      transaction.status = TransactionStatus.PENDING;
    }

    try {
      const idOriginalTransaction = await persistTransaction(transaction);

      if (transaction.recurrence !== TransactionRecurrence.UNIQUE) {
        await persistInstallments(transaction, idOriginalTransaction);
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
    const { error, data: createdTransaction } = await supabase
      .from("transactions")
      .insert({
        name: data.name,
        amount: data.amount,
        category: data.category,
        payment_method: data.paymentMethod,
        type: data.type,
        status: data.status,
        recurrence: data.recurrence,
        due_date: data.dueDate.toISOString(),
        installment_amount: data.installmentAmount || null,
        user_id: user!.id,
      })
      .select("id")
      .limit(1)
      .single();

    if (error) throw new Error("Erro ao cadastrar nova transação.");
    return createdTransaction.id;
  }

  async function persistInstallments(
    transaction: NewTransactionFormData,
    idOriginalTransaction: number
  ) {
    const installments = createInstallmentsFromTransaction(
      transaction,
      idOriginalTransaction
    );
    const { error } = await supabase.from("transactions").insert(installments);
    if (error) throw new Error("Erro ao cadastrar parcelas.");
  }

  function createInstallmentsFromTransaction(
    transaction: NewTransactionFormData,
    idOriginalTransaction: number
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
        payment_method: transaction.paymentMethod,
        type: transaction.type,
        status: TransactionStatus.PENDING,
        due_date: dueDate.toISOString(),
        recurrence: transaction.recurrence,
        user_id: user!.id,
        id_original_transaction: idOriginalTransaction,
      } as any;
      if (transaction.recurrence === TransactionRecurrence.INSTALLMENT) {
        installment.installment_number = i;
        installment.installment_amount = transaction.installmentAmount;
      }

      installments.push(installment);
    }

    return installments;
  }

  return {
    handleSave,
  };
}
