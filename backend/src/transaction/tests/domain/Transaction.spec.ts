import {Transaction} from "@transaction/domain/Transaction";
import {TransactionName} from "@transaction/domain/TransactionName";
import {TransactionAmount} from "@transaction/domain/TransactionAmount";
import {TransactionType} from "@transaction/domain/TransactionType";
import {TransactionStatus} from "@transaction/domain/TransactionStatus";
import {TransactionRecurrence} from "@transaction/domain/TransactionRecurrence";

describe('Transaction', () => {
  test("Should be able to create a transaction", () => {
    const transaction = new Transaction({
      name: new TransactionName('Fake transaction'),
      amount: new TransactionAmount(100),
      category: 'Fake category',
      paymentMethod: 'Fake payment method',
      type: TransactionType.INCOME,
      status: TransactionStatus.PENDING,
      recurrence: TransactionRecurrence.UNIQUE,
      installmentAmount: undefined,
      dueDate: new Date()
    })
    expect(transaction).toBeTruthy();
  })
})