export enum TransactionRecurrence {
  UNIQUE = "UNIQUE",
  INSTALLMENT = "INSTALLMENT",
  FIXED = "FIXED",
}

export function getTransactionRecurrence(
  recurrence: string
): TransactionRecurrence {
  switch (recurrence) {
    case "UNIQUE":
      return TransactionRecurrence.UNIQUE;
    case "INSTALLMENT":
      return TransactionRecurrence.INSTALLMENT;
    case "FIXED":
      return TransactionRecurrence.FIXED;
    default:
      throw new Error("Invalid transaction recurrence");
  }
}
