const express = require("express");
const router = require("./routes/index");
const cors = require("cors");

const app = express();

app.use(cors(), express.json());

app.use("/api/vi", router);

app.listen(3000, () => console.log("listening to port 3000..."));
