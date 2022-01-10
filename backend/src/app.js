require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();
require("./db/db");

const i18n = require("./i18n");
const authRouter = require("./routes/auth");
const recipeRouter = require("./routes/recipe");

app.use(express.json());
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

const sess = {
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30, // 1 month
        sameSite: true,
    },
    name: "auth",
    saveUninitialized: false,
    secret: process.env.AUTH_SESS_SECRET,
    resave: false,
};

if (process.env.NODE_ENV === "production") {
    sess.cookie.secure = true;
    sess.store = MongoStore.create({ mongoUrl: process.env.DB_URl });
}

app.use(session(sess));
app.use(i18n.init);

app.use("/api", authRouter);
app.use("/api", recipeRouter);

module.exports = app;
