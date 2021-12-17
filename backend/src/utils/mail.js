const nodemailer = require("nodemailer");

async function sendConfirmationMail(credentials) {
    const { email, id } = credentials;
    let transporter;

    if (!email) {
        throw new Error("Email is required!");
    }

    if (!id) {
        throw new Error("User ID is required!");
    }

    if (process.env.NODE_HOST === "production") {
        // TODO: Add proper email host.
    } else {
        const testAccount = await nodemailer.createTestAccount();

        transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });
    }

    try {
        const info = await transporter.sendMail({
            from: '"Project Food" <projectfood@test.com>',
            to: email,
            subject: "Project Food | Confirm your account",
            html: `<a href='http://localhost:3000/api/confirm/${id}'>Click here to confirm your account</>`,
        });

        if (process.env.NODE_HOST !== "production") {
            console.log(`Mail URL: ${nodemailer.getTestMessageUrl(info)}`);
        }
    } catch (error) {
        throw error;
    }
}

module.exports = sendConfirmationMail;
