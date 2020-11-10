import React, { useState } from "react";
import axios from "axios";

import useInput from "../hooks/useInput";

const URL_POST_TRANSACTION = 'http://localhost:5000/api/v1/account/transaction/'

const TransactionForm = ({ addTransaction }) => {
  const [amount, setAmount, cleanAmount] = useInput("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useInput("credit");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!amount) return;

    postTransaction();

    cleanAmount();
  };

  const postTransaction = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${URL_POST_TRANSACTION}`, {
        amount: Number(amount),
        type,
      });

      console.log(res.data);
      addTransaction(res.data);
    } catch (err) {
      console.log(err);
      alert('Something went wrong, try again'); // too little time to do it right
    }

    setLoading(false);
  };

  return (
    <div className="TransactionForm">
      <h3>Add a new transaction!</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            aria-describedby="emailHelp"
            value={amount}
            onChange={setAmount}
          />
        </div>

        <div className="form-group">
          <label>Transaction type</label>
          <select
            className="form-control"
            name="type"
            value={type}
            onChange={setType}
          >
            <option value="credit">credit</option>
            <option value="debit">debit</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
