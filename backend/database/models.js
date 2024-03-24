const { model } = require("mongoose");
const { usersSchema, bankSchema } = require("./db");

const Users = model("Users", usersSchema);
const Account = model("Account", bankSchema);

module.exports = { Users, Account };
