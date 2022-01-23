const winston = require("winston");

const options = {
    file: {
        level: "info",
        filename: `${__dirname}/../logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: "debug",
        handleExceptions: true,
        json: false,
        colorize: true,
        silent: process.env.NODE_ENV === "test",
    },
};

const logger = winston.createLogger({
    transports: [
        //new winston.transports.File(options.file),
        new winston.transports.Console(options.console),
    ],
    exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
    write(message) {
        logger.info(message.substring(0, message.lastIndexOf("\n")));
    },
};

module.exports = logger;
