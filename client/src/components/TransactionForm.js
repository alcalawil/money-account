import React, { Component } from "react";
import Axios from "axios";

import { withTransactionContext } from "../HOCs/withTransactionContext";

export class TransactionForm extends Component {
  state = {
    loading: false,
    loaded: false,
    error: null,
    form: {
      // title: '',
      // description: '',
      type: "credit",
      amount: 0
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    const { form } = this.state;

    Axios.post("http://localhost:5000/api/v1/account/transaction", form)
      .then(response => {
        if (response.status >= 400) {
          throw response;
        }

        this.setState({ ...this.state, data: response.data });

        console.log(this.props.context);

        this.props.context.handleChange({
          transactions: [
            ...this.props.context.data.transactions,
            {
              ...form,
              ...response.data
            }
          ]
        });
      })
      .catch(err => {
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
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [name]: value
      }
    });
  };

  render() {
    const { amount, type } = this.state;

    return (
      <div className="TransactionForm">
        <h3>Add a new transaction!</h3>

        <form onSubmit={this.handleSubmit}>
          {/* TODO: Add support for those fields */}
          {/* <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="Title of transaction...."
              value={title}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              placeholder="I bought my first cat..."
              rows="3"
              value={description}
              onChange={this.handleChange}
            />
          </div> */}

          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              name="amount"
              aria-describedby="emailHelp"
              value={amount}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label>Card type</label>
            <select
              className="form-control"
              name="type"
              value={type}
              onChange={this.handleChange}
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
  }
}

export default withTransactionContext(TransactionForm);
