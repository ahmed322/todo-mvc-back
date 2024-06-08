const taskModel = require("../models/taskModel");

// crud
exports.createTask = (req, res) => {
	const { task } = req.body;

	if (task) {
		const newTask = new taskModel({ task, status: "active" });
		newTask
			.save()
			.then((doc) => {
				res.json(doc);
			})
			.catch((err) => {
				res.status(404).json({ msg: "failed to create task" });
			});
	}
};

exports.getTasks = (req, res) => {
	taskModel
		.find({})
		.then((doc) => {
			res.json(doc);
		})
		.catch((err) => {
			res.status(404).json({ msg: "failed to get tasks" });
		});
};

exports.updateTask = (req, res) => {
	let { id } = req.params;
	let { status } = req.body;
	taskModel
		.findByIdAndUpdate(
			{ _id: id },
			{ task: req.body.task, status: status || active },
			{ new: true }
		)
		.then((doc) => {
			res.json(doc);
		})
		.catch((err) => {
			res.status(404).json({ msg: "failed to update task" });
		});
};

exports.deleteTask = async (req, res) => {
	let { id } = req.params;
	try {
		let task = await taskModel.findByIdAndDelete(id);
		if (!task) {
			res.status(404).json({ msg: "task not found" });
		}
		res.status(204).json();
	} catch (err) {
		res.status(500).json({ msg: "server error" });
	}
};

exports.deleteCompletedTasks = async (req, res) => {
	try {
		// delete completed tasks
		let tasks = await taskModel.deleteMany({ status: "completed" });
		// get remaining tasks
		let data = await taskModel.find({});
		// send error if no completed tasks
		if (!tasks) {
			res.status(404).json({ msg: "no completed tasks" });
		}
		res.json(data).status(204);
		// catch error
	} catch (err) {
		res.status(404).json({ msg: "failed to delete tasks" });
	}
};

// exports.deleteCompletedTasks = (req, res) => {
// 	try {
// 		taskModel
// 		.findMany({ status: "completed" })
// 		.then((doc) => {
// 			res.json({doc}).status(204);
// 		})
// 	}catch((err) => {
// 			res.status(404).json({ msg: "failed to delete tasks" });
// 		});
// };
