import {TransactionType} from "./TransactionType";
import {TransactionStatus} from "./TransactionStatus";
import {TransactionRecurrence} from "./TransactionRecurrence";
import {randomUUID} from "crypto";
import {TransactionName} from "./TransactionName";
import {TransactionAmount} from "./TransactionAmount";
import {TransactionInstallmentAmount} from "./TransactionInstallmentAmount";

interface TransactionProps {
  name: TransactionName;
  amount: TransactionAmount;
  category: string;
  paymentMethod: string;
  type: TransactionType;
  status: TransactionStatus;
  recurrence: TransactionRecurrence;
  installmentAmount: TransactionInstallmentAmount;
  dueDate?: Date;
}

export class Transaction {
  private readonly _id: string;
  private props: TransactionProps;

  constructor(
    props: TransactionProps,
    id?: string
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      status: props.status ?? TransactionStatus.PENDING,
      dueDate: props.dueDate ?? new Date(),
    };
  }

  get id(): string {
    return this._id;
  }

  get name(): TransactionName {
    return this.props.name;
  }

  get amount(): TransactionAmount {
    return this.props.amount;
  }

  get category(): string {
    return this.props.category;
  }

  get paymentMethod(): string {
    return this.props.paymentMethod;
  }

  get type(): TransactionType {
    return this.props.type;
  }

  get status(): TransactionStatus {
    return this.props.status;
  }

  get recurrence(): TransactionRecurrence {
    return this.props.recurrence;
  }

  get installmentAmount(): TransactionInstallmentAmount | undefined {
    return this.props.installmentAmount;
  }

  get dueDate(): Date {
    return this.props.dueDate;
  }

  set name(value: TransactionName) {
    this.props.name = value;
  }

  set amount(value: TransactionAmount) {
    this.props.amount = value;
  }

  set category(value: string) {
    this.props.category = value;
  }

  set paymentMethod(value: string) {
    this.props.paymentMethod = value;
  }

  public settle(): void {
    this.props.status = TransactionStatus.SETTLED;
  }

  set dueDate(value: Date) {
    this.props.dueDate = value;
  }
}