const express = require("express");

const router = express.Router();
const { getSingleAlgorithm, getAllAlgorithms } = require("../controllers/algorithms");

/**
 * @openapi
 * /api/algorithms/single:
 *  get:
 *     tags:
 *     - Algorithms
 *     description: Returns data from wikipedia for concrete sorting algorithm
 *     responses:
 *       200:
 *         description: Success
 *       400:   
 *         description: Bad request
 *     parameters:
 *       - in: query
 *         name: lang
 *         type: string
 *         required: true
 *         description: Language in which the information from wikipedia should be provided
 *       - in: query
 *         name: algorithm
 *         type: string
 *         required: true
 *         description: The algorithm name
 */
router.route("/single").get(getSingleAlgorithm);
/**
 * @openapi
 * /api/algorithms/:
 *  get:
 *     tags:
 *     - Algorithms
 *     description: Gets all algorithms data stored inside database
 *     responses:
 *       200:
 *         description: Success
 *       500:   
 *         description: Internal Server Error
 *     parameters:
 *       - in: query
 *         name: lang
 *         type: string
 *         required: true
 *         description: Language in which the information from wikipedia should be provided
 *       - in: query
 *         name: algorithm
 *         type: string
 *         required: true
 *         description: The algorithm name
 */
router.route("/").get(getAllAlgorithms);

module.exports = router;