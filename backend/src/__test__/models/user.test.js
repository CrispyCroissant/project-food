const mockingoose = require("mockingoose");
const User = require("../../models/user");

describe("The user model", () => {
    it("should NOT create user if email is missing", async () => {
        const sample = new User({
            password: "password",
            emailConfirmed: false,
        });

        expect.assertions(2);
        try {
            await sample.save();
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toContain("Email is required!");
        }
    });

    it("should NOT create user if email is invalid", async () => {
        const sample = new User({
            email: "radDude.com",
            password: "password",
            emailConfirmed: false,
        });

        expect.assertions(2);
        try {
            await sample.save();
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toContain("This email is invalid!");
        }
    });

    it("should NOT create user if password is missing", async () => {
        const sample = new User({
            email: "radDude.com",
            emailConfirmed: false,
        });

        expect.assertions(2);
        try {
            await sample.save();
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toContain("Password is required!");
        }
    });

    it("should NOT create user if password is too short", async () => {
        const sample = new User({
            email: "radDude@email.com",
            password: "short",
            emailConfirmed: false,
        });

        expect.assertions(2);
        try {
            await sample.save();
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toContain(
                "Password must have at least 8 characters!"
            );
        }
    });

    it("should NOT create user if emailConfirmed is missing", async () => {
        const sample = new User({
            email: "radDude@email.com",
            password: "password123",
        });

        expect.assertions(2);
        try {
            await sample.save();
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toContain(
                "Email Confirmation status must be set!"
            );
        }
    });

    it("should create user if everything is valid", async () => {
        const sample = new User({
            email: "radDude@email.com",
            password: "password123",
            emailConfirmed: false,
        });

        expect.assertions(1);
        try {
            const result = await sample.save();
            expect(result).toBeDefined();
        } catch (error) {}
    });
});
