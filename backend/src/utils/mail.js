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

    if (process.env.NODE_ENV === "production") {
        transporter = nodemailer.createTransport({
            service: "Hotmail",
            auth: {
                user: process.env.EMAIL_HOST,
                pass: process.env.EMAIL_HOST_PASS,
            },
        });
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
            from: `"Project Food" <${process.env.EMAIL_HOST}>`,
            to: email,
            subject: "Project Food | Confirm your account",
            html: `<a href='${process.env.BASE_URL}/api/confirm/${id}'>Click here to confirm your account</>`,
        });

        if (process.env.NODE_ENV !== "production") {
            console.log(`Mail URL: ${nodemailer.getTestMessageUrl(info)}`);
        }
    } catch (error) {
        throw error;
    }
}

module.exports = sendConfirmationMail;
