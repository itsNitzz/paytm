const express = require("express");
const mongoose = require("mongoose");

const { Account } = require("../database/models");
const { authMiddleware } = require("../middlewares");
const { amountTransferSchema } = require("../validations/types");

const accountsRouter = express.Router();

accountsRouter.get("/balance", authMiddleware, async (req, res) => {
  const { balance } = await Account.findOne({ userId: req.userId });

  res.status(200).json({ balance });
});

// money transfer api
accountsRouter.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { success } = amountTransferSchema.safeParse(req.body);
  const { balance, _id } = await Account.findOne({ userId: req.userId }).session(session);
  const toAccount = await Account.findOne({ userId: req.body.to });

  if (!success) {
    return res.status(411).json({ message: "Incorrect inputs" });
  }
  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({ message: "Invalid account" });
  }

  if (balance < req.body.amount) {
    await session.abortTransaction();
    return res.status(400).json({ message: "Insufficient balance" });
  }

  //   perform transcation
  await Account.findByIdAndUpdate(_id, { $inc: { balance: -req.body.amount } }).session(session);
  await Account.findOneAndUpdate({ userId: req.body.to }, { $inc: { balance: req.body.amount } }).session(session);

  //   commit the transcation
  await session.commitTransaction();
  res.status(200).json({ message: "Transfer successful" });
});

module.exports = accountsRouter;
