const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: [true, "This email is already registered!"],
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: "This email is invalid!",
        },
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minlength: [8, "Password must have at least 8 characters!"],
    },
    recipes: {
        type: [String],
        required: false,
        trim: true,
    },
    emailConfirmed: {
        type: Boolean,
        required: [true, "Email Confirmation status must be set!"],
    },
});

const user = mongoose.model("User", userSchema);

module.exports = user;
