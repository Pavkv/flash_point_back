const {FORBIDDEN} = require("../errorCodes");

class CorsError extends Error {
    constructor(origin) {
        super(`CORS policy does not allow access from origin: ${origin}`);
        this.name = 'CorsError';
        this.statusCode = FORBIDDEN;
    }
}

module.exports = CorsError;