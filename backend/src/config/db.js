const mongoose = require("mongoose");

const mongoDB = process.env.DB_URL;

if (process.env.NODE_ENV !== "test") {
    const db = mongoose.connection;

    mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    db.on("error", console.error.bind(console, "MongoDB connection error:"));
}
