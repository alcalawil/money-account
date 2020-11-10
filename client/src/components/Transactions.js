import React, { useEffect, useState } from "react";
import Transaction from "./Transaction";
import axios from "axios";

const URL_TRANSACTIONS = `http://localhost:5000/api/v1/account/transactions/`

const Transactions = ({ loadTransactions, transactions }) => {
  const [loading, setLoading] = useState(false);
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${URL_TRANSACTIONS}`);

      loadTransactions(res.data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) return <h3>Loading...</h3>

  return (
    <React.Fragment>
      <h3>Transactions</h3>

      <div id="accordion">
        {transactions.map(({ id, type, amount }) => (
          <div className="card" key={id}>
            <div className="card-header" id={`heading_${id}`}>
              <h5 className="mb-0">
                <button
                  className="btn btn-link"
                  data-toggle="collapse"
                  data-target={`#collapse_${id}`}
                  aria-expanded="false"
                  aria-controls={`heading_${id}`}
                >
                  Type: {type} - Amount: {amount}$
                </button>
              </h5>
            </div>

            <div
              id={`collapse_${id}`}
              className="collapse"
              aria-labelledby={`heading_${id}`}
              data-parent="#accordion"
            >
              <Transaction id={id} />
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Transactions;
