const mongoose = require("mongoose");

const mongoDB = "mongodb://127.0.0.1/placeholder_db";

if (process.env.NODE_ENV !== "test") {
    const db = mongoose.connection;

    mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    db.on("error", console.error.bind(console, "MongoDB connection error:"));
}
