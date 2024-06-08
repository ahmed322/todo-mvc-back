const express = require("express");
const router = express.Router();
const {
	getTasks,
	createTask,
	updateTask,
	deleteTask,
	deleteCompletedTasks,
} = require("../services/taskServices");

router.get("/", getTasks);
router.put("/:id", updateTask);
router.post("/", createTask);
router.delete("/", deleteCompletedTasks);
router.delete("/:id", deleteTask);

module.exports = router;
