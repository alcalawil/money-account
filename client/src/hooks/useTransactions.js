import React, { useState } from "react";

const useTransactions = (initialList) => {
  const [transactions, setTransactions] = useState(initialList);
  
  const addTransaction = ({ amount, type }) => {
    setTransactions([
      ...transactions,
      {
        id: transactions.length + 1,
        amount,
        type,
      },
    ]);

    return [transactions, addTransaction];
  };
}

export default useTransactions;
