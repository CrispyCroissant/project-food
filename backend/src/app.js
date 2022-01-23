const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const morgan = require("morgan");
const winston = require("./config/winston");
const app = express();
require("./config/db");

const i18n = require("./config/i18n");
const authRouter = require("./routes/auth");
const recipeRouter = require("./routes/recipe");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

app.use(express.json());
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);
app.use(morgan("combined", { stream: winston.stream }));

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
app.use((req, res, next) => {
    i18n.init(req, res);
    const locale = i18n.getLocale(req);
    i18n.setLocale(locale);
    next();
});

app.use("/api", authRouter);
app.use("/api", recipeRouter);

module.exports = app;
