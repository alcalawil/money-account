class AccountService {
  constructor(store) {
    this.store = store;
  }

  async getBalance() {
    const transactions = await this.getTransactionHistory();

    if (!transactions.length) {
      return {
        currency: "USD",
        amount: 0
      };
    }

    const balance = transactions.reduce((accum, trans) => {
      return trans.type === "debit"
        ? accum - trans.amount
        : accum + trans.amount;
    }, 0);

    return {
      currency: "USD",
      amount: balance
    };
  }

  async getTransaction(id) {
    return this.store.getTransaction(id);
  }

  async getTransactionHistory() {
    return this.store.getTransactions();
  }

  async processNewTransaction(type, amount) {
    return this.store.saveNewTransaction(type, amount);
  }
}

module.exports = store => new AccountService(store);
