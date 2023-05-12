export enum TransactionType {
  OUTCOME = "OUTCOME",
  INCOME = "INCOME",
}

export function getTransactionType(type: string): TransactionType {
  switch (type) {
    case "OUTCOME":
      return TransactionType.OUTCOME;
    case "INCOME":
      return TransactionType.INCOME;
    default:
      throw new Error("Invalid transaction type");
  }
}

export function getTransactionTypeLabel(type: TransactionType): string {
  switch (type) {
    case TransactionType.OUTCOME:
      return "Despesa";
    case TransactionType.INCOME:
      return "Receita";
    default:
      return "";
  }
}
