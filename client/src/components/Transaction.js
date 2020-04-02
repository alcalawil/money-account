import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export class Transaction extends Component {
  state = {
    loading: true,
    loaded: false,
    transaction: null
  };

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/v1/account/transaction/${this.props.id}`)
      .then(response => {
        if (response.status >= 400) {
          throw response;
        }

        this.setState({
          ...this.state,
          error: null,
          transaction: response.data
        });
      })
      .catch(err => {
        switch (err.status) {
          case 400:
            return this.setState({
              ...this.state,
              error:
                "Error: Wrong params, make sure are consulting the transaction correctly"
            });
          case 404:
            return this.setState({
              ...this.state,
              error: "Error: Transaction not found"
            });
          case 500:
          default:
            this.setState({
              ...this.state,
              error: "Error: Internal server error"
            });
            this.setState({
              ...this.state,
              error: "Error: Internal server error"
            });
        }
      })
      .finally(() =>
        this.setState({ ...this.state, loading: false, loaded: true })
      );
  }

  render() {
    const { loading, loaded, transaction, error } = this.state;

    if (loading || !loaded) {
      return null;
    }

    if (error) {
      return (
        <div className="alert alert-danger m-2" role="alert">
          {error}
        </div>
      );
    }

    return (
      <form className="p-2">
        {transaction.title && (
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="email"
              className="form-control"
              id="title"
              value={transaction.title}
              disabled
            />
          </div>
        )}

        {transaction.description && (
          <div className="form-group">
            <label htmlFor="description">description</label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              value={transaction.description}
              disabled
            />
          </div>
        )}

        <div className="form-group">
          <label>card type</label>
          <select className="form-control" value={transaction.type} disabled>
            <option value="credit">credit</option>
            <option value="debit">debit</option>
          </select>
        </div>
      </form>
    );
  }
}

Transaction.propTypes = {
  id: PropTypes.string.isRequired
};

export default Transaction;
