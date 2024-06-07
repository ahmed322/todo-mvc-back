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

exports.deleteTasks = (req, res) => {
	taskModel
		.deleteMany({})
		.then((doc) => {
			res.json({}).status(204);
		})
		.catch((err) => {
			res.status(404).json({ msg: "failed to delete tasks" });
		});
};
