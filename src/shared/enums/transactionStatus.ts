export enum TransactionStatus {
  PENDING = "PENDING",
  SETTLED = "SETTLED",
}

export function getTransactionStatus(status: string): TransactionStatus {
  switch (status) {
    case "PENDING":
      return TransactionStatus.PENDING;
    case "SETTLED":
      return TransactionStatus.SETTLED;
    default:
      throw new Error("Invalid transaction status");
  }
}
