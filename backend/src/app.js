require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
require("./db/db");

app.use(express());
app.use(cors());

module.exports = app;
