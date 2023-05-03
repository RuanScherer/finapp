import { getTransactionRecurrence } from "@shared/enums/transactionRecurrence";
import { getTransactionStatus } from "@shared/enums/transactionStatus";
import { getTransactionType } from "@shared/enums/transactionType";
import { formatDateToUTC } from "@shared/utils/formatDateToUTC";
import { DatabaseTransaction, Transaction } from "./transactionMapper.types";

export function toDatabaseTransaction(data: Transaction) {
  return {
    id: data.id,
    name: data.name,
    amount: data.amount,
    type: data.type,
    category: data.category,
    payment_method: data.paymentMethod,
    recurrence: data.recurrence,
    due_date: data.dueDate,
    status: data.status,
    installment_amount: data.installmentAmount ?? null,
    installment_number: data.installmentNumber ?? null,
    user_id: data.userId,
    id_original_transaction: data.idOriginalTransaction ?? null,
  };
}

export function toApplicationTransaction(data: DatabaseTransaction) {
  return {
    id: data.id, // tornar obrigatorio no Transaction
    name: data.name,
    amount: data.amount,
    type: getTransactionType(data.type),
    category: data.category,
    paymentMethod: data.payment_method,
    recurrence: getTransactionRecurrence(data.recurrence),
    dueDate: formatDateToUTC(new Date(data.due_date)), // testar se data fica certa
    status: getTransactionStatus(data.status),
    installmentAmount: data.installment_amount ?? undefined,
    installmentNumber: data.installment_number ?? undefined,
    userId: data.user_id,
    idOriginalTransaction: data.id_original_transaction ?? undefined,
  };
}
