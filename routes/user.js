const express = require("express");
const { loginUser, registerUser, deleteUser, verifyJWTToken, updateProfile, getUsers, resetLogins } = require("../controllers/user");
const authMiddleware = require("../middlewares/authorization");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.delete("/:email", authMiddleware, deleteUser);

router.post("/verify", verifyJWTToken);
router.put("/profile", authMiddleware, updateProfile);
router.get("/", authMiddleware, getUsers);

router.post("/reset", authMiddleware, resetLogins);

module.exports = router;