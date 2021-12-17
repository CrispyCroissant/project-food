const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/register", async (req, res) => {
    res.send();
});

router.post("/login", async (req, res) => {
    res.send();
});

router.post("/confirm/:id", async (req, res) => {
    res.send();
});

module.exports = router;
