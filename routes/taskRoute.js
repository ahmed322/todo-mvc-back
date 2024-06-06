const express = require("express");
const router = express.Router();
const {
	getTasks,
	createTask,
	updateTask,
	deleteTask,
	deleteTasks,
} = require("../services/taskServices");

router.get("/", getTasks);
router.put("/:id", updateTask);
router.post("/", createTask);
router.delete("/:id", deleteTask);
router.delete("/", deleteTasks);

module.exports = router;
