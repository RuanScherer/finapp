export class TransactionInstallmentAmount {
  private readonly _installmentAmount: number;

  constructor(value: number) {
    this._installmentAmount = value;
    if (!this.isValid()) {
      throw new Error('Invalid transaction installment amount');
    }
  }

  get value(): number {
    return this._installmentAmount;
  }

  private isValid() {
    return this._installmentAmount > 1;
  }
}