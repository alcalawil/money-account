import React, { useEffect, useState } from "react";

import Transactions from "./components/Transactions";
import TransactionForm from "./components/TransactionForm";
import useTransactions from "./hooks/useTransactions";

const App = () => {
  // const [transactions, addTransaction] = useTransactions([]);
  const [transactions, setTransactions] = useState([]);

  const addTransaction = ({ id, amount, type }) => {
    setTransactions([...transactions, { id, amount, type }]);
  };

  const loadTransactions = (transactionList) => {
    setTransactions([...transactions, ...transactionList]);
  };

  return (
    <div className="container">
      <TransactionForm addTransaction={addTransaction} />
      <hr />
      <Transactions
        transactions={transactions}
        loadTransactions={loadTransactions}
      />
    </div>
  );
};

export default App;
