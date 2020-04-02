// https://itnext.io/combining-hocs-with-the-new-reacts-context-api-9d3617dccf0b

import React from 'react';

import { TransactionContext } from '../App';

export function withTransactionContext(Component) {
  return function WrapperComponent(props) {
    return (
      <TransactionContext.Consumer>
        {state => <Component {...props} context={state} />}
      </TransactionContext.Consumer>
    );
  };
}
