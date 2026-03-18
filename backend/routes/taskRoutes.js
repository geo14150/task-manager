const express = require("express");
const router  = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");
const { cache }   = require("../middleware/cache");

router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management endpoints
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Λίστα όλων των tasks του user
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200: { description: "Array από tasks" }
 *       401: { description: "Μη εξουσιοδοτημένος" }
 */
router.get("/", cache(60), getTasks);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Δημιουργία νέας task
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:       { type: string,  example: "Νέα Task" }
 *               description: { type: string,  example: "Περιγραφή" }
 *               status:      { type: string,  enum: [todo, in-progress, done] }
 *               priority:    { type: string,  enum: [low, medium, high] }
 *     responses:
 *       201: { description: "Task δημιουργήθηκε" }
 */
router.post("/", createTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Ενημέρωση task
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: "Task ενημερώθηκε" }
 *       404: { description: "Task not found" }
 */
router.put("/:id", updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Διαγραφή task
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: "Task διαγράφηκε" }
 *       404: { description: "Task not found" }
 */
router.delete("/:id", deleteTask);

module.exports = router;