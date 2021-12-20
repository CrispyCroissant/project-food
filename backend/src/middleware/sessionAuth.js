const User = require("../models/user");

async function sessionAuth(req, res, next) {
    const { session } = req;

    if (session.userID) {
        try {
            const user = await User.findById(session.userID);

            if (!user) {
                return res.status(401).send({ error: "User unauthorized" });
            }
            if (!user.emailConfirmed) {
                return res
                    .status(401)
                    .send({ error: "User must confirm their email." });
            }
        } catch (error) {
            return res.status(401).send({ error: error.message });
        }
    }

    next();
}

module.exports = sessionAuth;
