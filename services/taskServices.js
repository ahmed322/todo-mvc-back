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

exports.deleteTask = (req, res) => {
	let { id } = req.params;
	let task = taskModel.findByIdAndDelete(id);
	if (!task) {
		res.status(404).send("task not found");
	} else {
		res.json({}).status(204);
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
