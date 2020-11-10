import React, { useState, useEffect } from "react";
import axios from "axios";

const URL_TRANSACTION_BY_ID = `http://localhost:5000/api/v1/account/transaction/`

const Transaction = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState({});

  useEffect(() => {
    fetchTransactionDetailById();
  }, []);

  const fetchTransactionDetailById = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${URL_TRANSACTION_BY_ID}${id}`);
      setTransaction(res.data);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const error = null;
  if (error) {
    return (
      <div className="alert alert-danger m-2" role="alert">
        {error}
      </div>
    );
  }

  return (
    <form className="p-2">
        <div className="form-group">
          <label htmlFor="title">TxId</label>
          <input
            type="email"
            className="form-control"
            id="title"
            value={transaction.id}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">amount</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={transaction.amount}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Effective Date</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={transaction.effectiveDate}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Status</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={transaction.status}
            disabled
          />
        </div>

      <div className="form-group">
        <label>type</label>
        <select className="form-control" value={transaction.type} disabled>
          <option value="credit">credit</option>
          <option value="debit">debit</option>
        </select>
      </div>
    </form>
  );
};

export default Transaction;
