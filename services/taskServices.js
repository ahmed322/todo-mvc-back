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
				res.status(404).send(err);
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
			res.status(404).send(err);
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
			res.status(404).send(err);
		});
};

exports.deleteTask = async (req, res) => {
	let { id } = req.params;
	try {
		let task = taskModel.findByIdAndDelete(id);
		if (!task) {
			res.status(404).send("task not found");
		}
		res.status(204).json();
	} catch (err) {
		res.status(500).send("An error occurred while deleting the task");
	}
};

exports.deleteTasks = (req, res) => {
	taskModel
		.deleteMany({})
		.then((doc) => {
			res.json({}).status(204);
		})
		.catch((err) => {
			res.status(404).send(err);
		});
};
