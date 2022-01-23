const i18n = require("i18n");
const path = require("path");

i18n.configure({
    locales: ["en", "sv", "pl"],
    directory: path.join(__dirname, "..", "/locales"),
    objectNotation: true,
});

module.exports = i18n;
