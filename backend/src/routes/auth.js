const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).send({ error: "Email is required!" });
    }

    if (!password) {
        return res.status(400).send({ error: "Password is required!" });
    }

    const user = new User({ email, password, emailConfirmed: false });

    try {
        await user.save();
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }

    res.send({ status: 200 });
});

router.post("/login", async (req, res) => {
    res.send();
});

router.post("/confirm/:id", async (req, res) => {
    res.send();
});

module.exports = router;
