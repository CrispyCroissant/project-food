const mongoose = require("mongoose");
const validator = require("validator");
const argon2 = require("argon2");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true,
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

userSchema.statics.hashPassword = async function (password) {
    try {
        return await argon2.hash(password);
    } catch (error) {
        throw error;
    }
};

userSchema.methods.verifyPassword = async function (password) {
    try {
        return await argon2.verify(this.password, password);
    } catch (error) {
        throw error;
    }
};

userSchema.post("save", function (error, doc, next) {
    if (error.code === 11000) {
        next(new Error("This email is already in use!"));
    } else {
        next(error);
    }
});

const user = mongoose.model("User", userSchema);

module.exports = user;
