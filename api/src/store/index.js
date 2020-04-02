const { v4: uuid } = require("uuid");

class AccountStore {
  constructor() {
    this.transactions = [
      // First mocked transaction
      {
        id: "fcd21290-6a6e-4986-87ed-437eda739b83",
        type: "credit",
        amount: 0,
        effectiveDate: "2020-04-02T00:15:26.765Z"
      }
    ];
  }

  async getTransactions(count) {
    try {
      return this.transactions;
    } catch (err) {
      throw new Error(`DB Error: getTransactions - ${err.message}`);
    }
  }

  async getTransaction(id) {
    try {
      return this.transactions.find(transaction => id === transaction.id) || {};
    } catch (err) {
      throw new Error(`DB Error: getTransactions - ${err.message}`);
    }
  }

  async saveNewTransaction(type, amount) {
    const transaction = {
      id: uuid(),
      type,
      amount,
      effectiveDate: new Date().toISOString()
    };

    try {
      // insert into db
      this.transactions.push(transaction);
    } catch (err) {
      throw new Error(`DB Error: saveNewTransaction - ${err.message}`);
    }

    return transaction;
  }
}

module.exports = new AccountStore();
