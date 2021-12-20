const express = require("express");
const router = express.Router();
const User = require("../models/user");
const sendConfirmationMail = require("../utils/mail");

router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).send({ error: "Email is required!" });
    }

    if (!password) {
        return res.status(400).send({ error: "Password is required!" });
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
        return res.status(400).send({ error: "Email is required!" });
    }

    if (!password) {
        return res.status(400).send({ error: "Password is required!" });
    }

    try {
        const user = await User.findOne({ email });

        if (!(await user.verifyPassword(password))) {
            return res.status(401).send({ error: "Password is invalid!" });
        }

        session.userID = user._id;
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }

    res.send({ status: 200 });
});

router.post("/confirm/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);
        user.emailConfirmed = true;
        await user.save();
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }

    res.send({ status: 200 });
});

module.exports = router;
