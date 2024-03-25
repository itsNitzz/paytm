const express = require("express");
const jwt = require("jsonwebtoken");

const { userInputValidationMiddleware, authMiddleware } = require("../middlewares");
const { signinBodySchema, updateBodySchema } = require("../validations/types");
const { Users, Account } = require("../database/models");
const { JWT_SECRET } = require("../config");

const userRouter = express.Router();

// signup
userRouter.post("/signup", userInputValidationMiddleware, async (req, res) => {
  const user = await Users.create(req.body);
  await Account.create({ userId: user._id, balance: Math.random() * 1000 + 1 });
  const userId = jwt.sign({ userId: user._id }, JWT_SECRET);
  res.status(200).json({
    message: "User created successfully",
    token: userId,
  });
});

// signin
userRouter.post("/signin", async (req, res) => {
  const getUser = await Users.findOne(req.body);
  const { success } = signinBodySchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ message: "Incorrect inputs" });
  }
  if (!getUser) {
    return res.status(411).json({ message: "Error while logging in" });
  }
  const userId = jwt.sign({ userId: getUser._id }, JWT_SECRET);
  res.status(200).json({ token: userId });
});

// update
userRouter.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBodySchema.safeParse(req.body);

  if (!success) return res.status(411).json({ message: "Error while updating information" });

  await Users.updateOne({ _id: req.userId }, { ...req.body });

  res.status(200).json({ message: "Updated successfully" });
});

// filter
userRouter.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  const users = await Users.find({
    $or: [{ firstName: { $regex: filter }, lastName: { $regex: filter } }],
  });

  res.status(200).json({
    users: users.map(({ username, _id, firstName, lastName }) => {
      return {
        username,
        firstName,
        lastName,
        _id,
      };
    }),
  });
});

module.exports = userRouter;
