const jwt = require("jsonwebtoken");

function verifyJWT(auth) {
    const token = auth.split(' ')[1];
    const verificationRes = jwt.verify(token, process.env.JWT_SECRET, {
        audience: process.env.JWT_AUDIENCE,
        issuer: process.env.JWT_ISSUER
    });

    return verificationRes;
}

module.exports = verifyJWT;