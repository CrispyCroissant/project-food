const express = require("express");
const i18n = require("i18n");
const router = express.Router();
const User = require("../models/user");
const sendConfirmationMail = require("../utils/mail");
const sessionAuth = require("../middleware/sessionAuth");

router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).send({ error: i18n.__("auth.emailRequired") });
    }

    if (!password) {
        return res.status(400).send({ error: i18n.__("auth.passRequired") });
    }

    const user = new User({
        email,
        password: await User.hashPassword(password),
        emailConfirmed: false,
    });

    try {
        await user.save();
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }

    try {
        await sendConfirmationMail({
            email: user.email,
            id: user._id,
        });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }

    res.send({ status: 200 });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const { session } = req;

    if (!email) {
        return res.status(400).send({ error: i18n.__("auth.emailRequired") });
    }

    if (!password) {
        return res.status(400).send({ error: i18n.__("auth.passRequired") });
    }

    try {
        const user = await User.findOne({ email });

        if (user) {
            if (!(await user.verifyPassword(password))) {
                return res
                    .status(401)
                    .send({ error: i18n.__("auth.passInvalid") });
            }
            if (!user.emailConfirmed) {
                return res
                    .status(401)
                    .send({ error: i18n.__("auth.emailNotConf") });
            }
        } else {
            return res.status(404).send({ error: i18n.__("auth.noAccount") });
        }

        session.userID = user._id;
    } catch (error) {
        return res.status(400).send({ error: i18n.__("genericError") });
    }

    res.send({ status: 200 });
});

router.get("/confirm/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);
        user.emailConfirmed = true;
        await user.save();
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }

    res.redirect(301, process.env.FRONTEND_URL);
});

router.post("/logout", sessionAuth, (req, res) => {
    const { session } = req;

    session.destroy();

    res.clearCookie("auth");
    res.send();
});

router.get("/isAuth", sessionAuth, (req, res) => {
    res.send({ isAuth: true });
});

module.exports = router;
