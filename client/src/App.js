import React, { createContext, Component } from "react";
import Axios from "axios";

import Transactions from "./components/Transactions";
import TransactionForm from "./components/TransactionForm";

export const TransactionContext = createContext();

class App extends Component {
  state = {
    data: {
      transactions: [],
    },
  };

  componentDidMount() {
    Axios.get("http://localhost:5000/api/v1/account/transactions")
      .then((response) => {
        if (response.status >= 400) {
          throw response;
        }

        this.setState({
          ...this.state,
          data: { ...this.state.data, transactions: response.data },
        });
      })
      .catch((err) => {
        switch (err.status) {
          case 400:
            console.log(err);
            break;
          default:
            console.log(err);
        }
      })
      .finally(() =>
        this.setState({ ...this.state, loading: false, loaded: true })
      );
  }

  handleChange = (data) => {
    this.setState({ ...this.state, data });
  };

  render() {
    return (
      <div className="App container">
        {/* TODO: Implement routing */}

        <TransactionContext.Provider
          value={{ data: this.state.data, handleChange: this.handleChange }}
        >
          <TransactionForm />

          <hr />

          <Transactions />
        </TransactionContext.Provider>
      </div>
    );
  }
}

export default App;
