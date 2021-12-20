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

router.patch("/recipe", sessionAuth, async (req, res) => {
    const { oldRecipe, newRecipe } = req.body;
    const { id } = req.session;

    if (!oldRecipe) {
        return res.status(400).send({ error: "oldRecipe is required!" });
    }

    if (!newRecipe) {
        return res.status(400).send({ error: "newRecipe is required!" });
    }

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send({ error: "User was not found" });
        }

        const recipeIndex = user.recipes.indexOf(oldRecipe);

        if (recipeIndex === -1) {
            return res.status(404).send({ error: "Recipe was not found" });
        }

        user.recipes[recipeIndex] = newRecipe;

        await user.save();

        res.send({ oldRecipe, newRecipe });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
});

router.delete("/recipe/:recipe", sessionAuth, async (req, res) => {
    const { recipe } = req.params;
    const { id } = req.session;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send({ error: "User was not found" });
        }

        const recipeIndex = user.recipes.indexOf(recipe);

        if (recipeIndex === -1) {
            return res.status(404).send({ error: "Recipe was not found" });
        }

        const deletedRecipe = user.recipes.splice(recipeIndex, 1);

        await user.save();

        res.send({ deletedRecipe });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
});

module.exports = router;
