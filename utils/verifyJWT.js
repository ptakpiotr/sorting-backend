const jwt = require("jsonwebtoken");

function verifyJWT(auth, checkAdmin = false) {
    const token = auth.split(' ')[1];
    const verificationRes = jwt.verify(token, process.env.JWT_SECRET, {
        audience: process.env.JWT_AUDIENCE,
        issuer: process.env.JWT_ISSUER
    });

    if (checkAdmin) {
        if (verificationRes.group !== "admin") {
            throw new jwt.JsonWebTokenError();
        }
    }

    return verificationRes;
}

module.exports = verifyJWT;