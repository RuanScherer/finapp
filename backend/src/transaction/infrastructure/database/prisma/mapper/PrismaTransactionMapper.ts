import {Transaction} from "@transaction/application/domain/Transaction";

interface PrismaTransactionProps {
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

export class PrismaTransaction {
  private props: PrismaTransactionProps;

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