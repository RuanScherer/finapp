export class TransactionAmount {
  private readonly _amount: number;

  constructor(value: number) {
    this._amount = value;
    if (!this.isValid()) {
      throw new Error('Invalid transaction amount');
    }
  }

  get value(): number {
    return this._amount;
  }

  private isValid() {
    return this._amount > 0;
  }
}