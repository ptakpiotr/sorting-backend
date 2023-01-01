const express = require("express");
const { loginUser, registerUser, deleteUser, verifyJWTToken, updateProfile, getUsers, resetLogins } = require("../controllers/user");
const authMiddleware = require("../middlewares/authorization");

const router = express.Router();
/**
 * @openapi
 * /api/user/login:
 *  post:
 *     tags:
 *      - User
 *     description: Logins to an account
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         required:
 *          - email
 *          - password
 *         properties:
 *           email:
 *             type: string
 *           password:
 *             type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:   
 *         description: Bad request
 *       404: 
 *         description: Not found
 *       429: 
 *         description: Too many requests
 *       500: 
 *         description: Internal server error
 *     
 */
router.post("/login", loginUser);

/**
 * @openapi
 * /api/user/register:
 *  post:
 *     tags:
 *      - User
 *     description: Registers new user
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         required:
 *          - email
 *          - password
 *         properties:
 *           email:
 *             type: string
 *           password:
 *             type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:   
 *         description: Bad request
 *       500: 
 *         description: Internal server error
 *     
 */

router.post("/register", registerUser);

/**
 * @openapi
 * /api/user/{email}:
 *  delete:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - User
 *     description: Deletes exisiting user
 *     parameters:
 *      - in: path 
 *        name: email   
 *        required: true
 *        schema:
 *           type: string
 *        description: User email
 *     responses:
 *       201:
 *         description: Created
 *       400:   
 *         description: Bad request
 *       500: 
 *         description: Internal server error
 *     
 */
router.delete("/:email", authMiddleware, deleteUser);

/**
 * @openapi
 * /api/user/verify:
 *  post:
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         required:
 *          - token
 *          - verifyAdmin
 *         properties:
 *           email:
 *             type: string
 *           verifyAdmin:
 *             type: boolean
 *     tags:
 *      - User
 *     description: Verifies JWT token authenticity
 *     responses:
 *       200:
 *         description: Success
 *       401: 
 *         description: Unauthorized
 *     
 */
router.post("/verify", verifyJWTToken);

/**
 * @openapi
 * /api/user/profile:
 *  put:
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         required:
 *          - allowAddingItems
 *          - displayAlgorithmsDescription
 *         properties:
 *           allowAddingItems:
 *             type: boolean
 *           displayAlgorithmsDescription:
 *             type: boolean
 *     tags:
 *      - User
 *     description: Updates user preferences in user profile
 *     responses:
 *       200:
 *         description: Success
 *       400: 
 *         description: Bad request
 *     
 */
router.put("/profile", authMiddleware, updateProfile);

/**
 * @openapi
 * /api/user/:
 *  get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - User
 *     description: Gets all users
 *     responses:
 *       200:
 *         description: Success
 *       500: 
 *         description: Internal server error
 *     
 */

router.get("/", authMiddleware, getUsers);

/**
 * @openapi
 * /api/user/reset:
 *  post:
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         required:
 *          - email
 *         properties:
 *           email:
 *             type: string
 *           password:
 *     tags:
 *      - User
 *     description: Resets invalid logins for user (admin only)
 *     responses:
 *       204:
 *         description: No content
 *       400: 
 *         description: Bad request
 *     
 */
router.post("/reset", authMiddleware, resetLogins);

module.exports = router;