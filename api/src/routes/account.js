const express = require("express");
const AccountService = require("../services/accountService");
const store = require("../store");
const router = express.Router();

const accountService = AccountService(store);

/****** ************************************************************************
 *                       Transaction - "POST /api/v1/transaction/"
 ******************************************************************************/
router.post("/transaction", async (req, res) => {
  const { type, amount } = req.body;

  if (!type || !amount) {
    return res.status(400).json({
      error: "type and amount are required"
    });
  }

  if (amount < 0) {
    return res.status(400).json({
      error: "amount cannot be negative"
    });
  }

  try {
    const transaction = await accountService.processNewTransaction(
      type,
      amount
    );
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500);
  }
});

router.get("/transaction/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (id.length !== 36) {
      return res.status(400).json({
        error: `Id should be an uuid of 36 characters`
      });
    }

    const transaction = await accountService.getTransaction(id);

    if (!transaction) {
      return res.status(404).json({
        error: `Transaction ${id} not found`
      });
    }

    res.status(200).json(transaction);
  } catch (err) {
    // TODO: Use a robust logger
    console.debug("/transaction/:id", err);
    res.status(500).json(err.message);
  }
});

router.get("/transactions", async (req, res) => {
  try {
    const transactions = await accountService.getTransactionHistory(
      "default_account"
    );
    res.status(200).json(transactions);
  } catch (err) {
    // TODO: Use a robust logger
    console.debug("/transaction/:id", err);
    res.status(500).json(err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const balance = await accountService.getBalance("default_account");
    res.status(200).json(balance);
  } catch (err) {
    // TODO: Use a robust logger
    console.debug("/transaction/:id", err);
    res.status(500).json(err.message);
  }
});

module.exports = router;
