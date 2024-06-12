const taskModel = require("../models/taskModel");
const ApiError = require("../utils/apiErrorHandler");

// crud
exports.createTask = (req, res, next) => {
	const { task } = req.body;

	if (task) {
		const newTask = new taskModel({ task, status: "active" });
		newTask
			.save()
			.then((doc) => {
				res.json(doc);
			})
			.catch((err) => {
				return next(new ApiError("failed to create task", 404));
			});
	}
};

exports.getTasks = (req, res, next) => {
	taskModel
		.find({})
		.then((doc) => {
			res.json(doc);
		})
		.catch((err) => {
			return next(new ApiError("failed to get tasks", 404));
		});
};

exports.updateTask = (req, res, next) => {
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
			return next(new ApiError("failed to update task", 404));
		});
};

exports.deleteTask = async (req, res, next) => {
	let { id } = req.params;
	try {
		let task = await taskModel.findByIdAndDelete(id);
		if (!task) {
			return next(new ApiError("task not found", 404));
		}
		res.status(204).json();
	} catch (err) {
		return next(new ApiError("server error", 404));
	}
};

exports.deleteCompletedTasks = async (req, res, next) => {
	try {
		// delete completed tasks
		let tasks = await taskModel.deleteMany({ status: "completed" });
		// get remaining tasks
		let data = await taskModel.find({});
		// send error if no completed tasks
		if (!tasks) {
			return next(new ApiError("no completed tasks", 404));
		}
		res.json(data).status(204);
		// catch error
	} catch (err) {
		return next(new ApiError("failed to delete tasks", 404));
	}
};
