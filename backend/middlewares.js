const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("./config");
const { userValidationSchema } = require("./validations/types");
const { Users } = require("./database/models");

async function userInputValidationMiddleware(req, res, next) {
  const newUserDetails = req.body;
  const isUserValid = userValidationSchema.safeParse(newUserDetails);
  const isExistingUser = await Users.findOne({
    username: newUserDetails.username,
    password: newUserDetails.password,
  });

  if (!isUserValid.success || isExistingUser?.username) {
    res.status(411).json({ message: "Email already taken or Incorrect inputs" });
    return;
  }

  next();
}

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) return res.status(403).json({});

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (e) {
    res.status(403).json(e);
  }
};

module.exports = { userInputValidationMiddleware, authMiddleware };
