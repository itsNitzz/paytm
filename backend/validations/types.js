const z = require("zod");

const userValidationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  password: z.string().min(5),
});

const signinBodySchema = z.object({
  username: z.string(),
  password: z.string().min(5),
});

const updateBodySchema = z.object({
  password: z.string().min(5).optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

const amountTransferSchema = z.object({
  to: z.string(),
  amount: z.number(),
});

module.exports = {
  userValidationSchema,
  signinBodySchema,
  updateBodySchema,
  amountTransferSchema,
};
