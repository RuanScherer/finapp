import {TransactionType} from "./TransactionType";
import {TransactionStatus} from "./TransactionStatus";
import {TransactionRecurrence} from "./TransactionRecurrence";
import {randomUUID} from "crypto";
import {TransactionName} from "./TransactionName";
import {TransactionAmount} from "./TransactionAmount";
import {TransactionInstallmentAmount} from "./TransactionInstallmentAmount";
import {Transaction} from "@transaction/domain/Transaction";

interface FaunaTransactionProps {
  id: string;
  name: string;
  amount: number;
  category: string;
  paymentMethod: string;
  type: string;
  status: string;
  recurrence: string;
  installmentAmount?: number;
  dueDate: Date;
}

export class FaunaTransaction {
  private props: FaunaTransactionProps;

  constructor(transaction: Transaction) {
    this.props = {
      id: transaction.id,
      name: transaction.name.value,
      amount: transaction.amount.value,
      category: transaction.category,
      paymentMethod: transaction.paymentMethod,
      type: transaction.type,
      status: transaction.status,
      recurrence: transaction.recurrence,
      installmentAmount: transaction.installmentAmount?.value,
      dueDate: transaction.dueDate,
    };
  }
}