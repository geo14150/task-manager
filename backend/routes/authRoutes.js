const express = require("express");
const router  = express.Router();
const { register, login, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Εγγραφή νέου χρήστη
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:     { type: string, example: "Γιώργης" }
 *               email:    { type: string, example: "giorgis@example.com" }
 *               password: { type: string, example: "123456" }
 *     responses:
 *       201: { description: "User δημιουργήθηκε επιτυχώς" }
 *       400: { description: "Email υπάρχει ήδη" }
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Σύνδεση χρήστη
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:    { type: string, example: "giorgis@example.com" }
 *               password: { type: string, example: "123456" }
 *     responses:
 *       200: { description: "Επιτυχής σύνδεση με JWT token" }
 *       401: { description: "Λάθος credentials" }
 */
router.post("/login", login);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Πληροφορίες logged-in χρήστη
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200: { description: "User profile" }
 *       401: { description: "Μη εξουσιοδοτημένος" }
 */
router.get("/me", protect, getMe);

module.exports = router;