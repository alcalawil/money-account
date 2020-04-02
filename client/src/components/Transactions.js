import React from 'react';
import { withTransactionContext } from '../HOCs/withTransactionContext';
import Transaction from './Transaction';

export const Transactions = (props) => {
  const { transactions } = props.context.data;

  return (
    <React.Fragment>
      <h3>Transactions</h3>

      <div id="accordion">
        {/* Sorry for the wierd 'data-toggle' and other bootstrap crap :c, I just copy that out from the docs */}
        {Array.isArray(transactions) && transactions.map((item) => (
          <div className="card" key={item.id}>
            <div className="card-header" id={`heading_${item.id}`}>
              <h5 className="mb-0">
                <button className="btn btn-link" data-toggle="collapse" data-target={`#collapse_${item.id}`} aria-expanded="false" aria-controls={`heading_${item.id}`}>
                  Type: {item.type} - Amount: {item.amount}$
                  </button>
              </h5>
            </div>

            <div id={`collapse_${item.id}`} className="collapse" aria-labelledby={`heading_${item.id}`} data-parent="#accordion">
              <Transaction id={item.id} />
            </div>
          </div>
        ))}

      </div>
    </React.Fragment>
  );
};

export default withTransactionContext(Transactions);
