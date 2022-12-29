const express = require("express");

const router = express.Router();
const { getSingleAlgorithm, getAllAlgorithms } = require("../controllers/algorithms");

router.route("/single").get(getSingleAlgorithm);
router.route("/").get(getAllAlgorithms);

module.exports = router;