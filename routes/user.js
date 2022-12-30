const express = require("express");
const { loginUser, registerUser, deleteUser, verifyJWTToken } = require("../controllers/user");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.delete("/:email", deleteUser);

router.post("/verify", verifyJWTToken);

module.exports = router;