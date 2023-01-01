const express = require("express");
const { getNumbers, addNumbers } = require("../controllers/numbers");

const router = express.Router();
/**
 * @openapi
 * /api/numbers/:
 *  get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Numbers
 *     description: Gets all numbers associated with the user
 *     responses:
 *       200:
 *         description: Success
 *       400:   
 *         description: Bad request
 *       401: 
 *         description: Unauthorized
 *  post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Numbers
 *     description: Adds numbers that user used for sorting purposes
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         required:
 *          - numbers
 *          - algorithm
 *         properties:
 *           numbers:
 *             type: array
 *             items:
 *              type: number
 *           algorithm:
 *             type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:   
 *         description: Bad request
 *       401: 
 *         description: Unauthorized
 *     
 */
router.route("/").get(getNumbers).post(addNumbers);

module.exports = router;