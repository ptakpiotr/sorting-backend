const verifyJWT = require("../utils/verifyJWT");

async function authMiddleware(socket, next) {
    try {
        const auth = socket.request.headers.authorization;
        if (auth.includes("Bearer")) {
            verifyJWT(auth);
            next();
        }
    } catch (err) {
        socket.conn.close();
    }
}


module.exports = authMiddleware;