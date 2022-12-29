const express = require("express");
const { loginUser, registerUser, deleteUser } = require("../controllers/user");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.delete("/:email", deleteUser);

module.exports = router;