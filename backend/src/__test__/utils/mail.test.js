const sendConfirmationMail = require("../../utils/mail");

describe("The mail handler", () => {
    it("should throw an error if an email is not given", async () => {
        expect.assertions(2);
        try {
            await sendConfirmationMail({ id: 1 });
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toBe("Email is required!");
        }
    });

    it("should throw an error if an ID is not given", async () => {
        expect.assertions(2);
        try {
            await sendConfirmationMail({ email: "blahblah" });
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toBe("User ID is required!");
        }
    });

    it("should throw an error if the email is invalid", async () => {
        expect.assertions(1);
        try {
            await sendConfirmationMail({ email: "blahblah", id: 1 });
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it("should NOT throw an error if everything is OK", async () => {
        process.env.EMAIL_HOST = "test@test.com";
        expect.assertions(0);
        try {
            await sendConfirmationMail({ email: "blahblah@mail.com", id: 1 });
        } catch (error) {
            expect(error).not.toBeDefined();
        }
    });
});
