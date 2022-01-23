const mongoose = require("mongoose");
const validator = require("validator");
const argon2 = require("argon2");
const i18n = require("../config/i18n");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, i18n.__("auth.emailRequired")],
        unique: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: i18n.__("auth.emailInvalid"),
        },
    },
    password: {
        type: String,
        required: [true, i18n.__("auth.passRequired")],
        minlength: [8, i18n.__("auth.passShort")],
    },
    recipes: {
        type: [String],
        required: false,
        trim: true,
    },
    emailConfirmed: {
        type: Boolean,
        required: [true, i18n.__("auth.emailConfStatus")],
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
        next(new Error(i18n.__("auth.emailIsUsed")));
    } else {
        next(error);
    }
});

const user = mongoose.model("User", userSchema);

module.exports = user;
