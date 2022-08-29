/* eslint-disable @typescript-eslint/no-var-requires */
const argv = require("./argv");

module.exports = parseInt(argv.port || process.env.PORT || "3005", 10);
