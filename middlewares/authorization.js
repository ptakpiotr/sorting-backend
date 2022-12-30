const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const verifyJWT = require("../utils/verifyJWT");

async function authMiddleware(req, res, next) {
    try {
        const auth = req.headers.authorization;
        if (auth.includes("Bearer")) {
            const verificationRes = verifyJWT(auth);
            req.userAuthInfo = verificationRes;
            next();
        }
    } catch (err) {
        console.error(err);
        if (res) {
            res.status(StatusCodes.UNAUTHORIZED).send();
        } else {
            return;
        }
    }
}


module.exports = authMiddleware;