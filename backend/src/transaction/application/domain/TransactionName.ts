export class TransactionName {
  private readonly _name: string;

  constructor(value: string) {
    this._name = value;
    if (!this.isValid()) {
      throw new Error('Invalid transaction name');
    }
  }

  get value(): string {
    return this._name;
  }

  private isValid() {
    return this._name.length >= 2;
  }
}