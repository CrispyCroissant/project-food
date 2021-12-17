require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
require("./db/db");

const authRouter = require("./routes/auth");

app.use(express.json());
app.use(cors());

app.use("/api", authRouter);

module.exports = app;
