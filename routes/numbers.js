const express = require("express");
const { getNumbers, addNumbers } = require("../controllers/numbers");

const router = express.Router();

router.route("/").get(getNumbers).post(addNumbers);

module.exports = router;