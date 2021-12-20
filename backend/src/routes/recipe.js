const express = require("express");
const router = express.Router();
const User = require("../models/user");
const sessionAuth = require("../middleware/sessionAuth");
const user = require("../models/user");

router.post("/recipe", sessionAuth, async (req, res) => {
    const { recipe } = req.body;
    const { userID } = req.session;

    if (!recipe) {
        return res.status(400).send({ error: "No recipe was provided!" });
    }

    try {
        const user = await User.findById(userID);
        user.recipes.push(recipe);
        await user.save();

        res.send({ recipes: user.recipes });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
});

router.get("/recipes", sessionAuth, async (req, res) => {
    const { id } = req.session;

    try {
        const user = await User.findById(id);

        if (user.recipes.length > 0) {
            res.send({ recipes: user.recipes });
        } else {
            return res.status(404).send({ error: "Couldn't find any recipes" });
        }
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
});

router.patch("/recipe", (req, res) => {
    res.send();
});

router.delete("/recipe", (req, res) => {
    res.send();
});

module.exports = router;
