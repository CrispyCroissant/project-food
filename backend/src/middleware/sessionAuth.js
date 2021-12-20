const User = require("../models/user");

async function sessionAuth(req, res, next) {
    const { session } = req;

    if (session.userID) {
        try {
            const user = await User.findById(session.userID);

            if (!user) {
                return res.status(401).send({ error: "User unauthorized" });
            }
        } catch (error) {
            return res.status(401).send({ error: error.message });
        }
    }

    next();
}

module.exports = sessionAuth;
