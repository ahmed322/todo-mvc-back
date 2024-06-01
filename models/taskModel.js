const mongoose = require("mongoose");

// schema
const taskSchema = mongoose.Schema(
	{
		task: {
			type: String,
			trim: true,
			required: [true, "task is required"],
			unique: [true, "task already exists"],
			minlength: [3, "task must be at least 3 characters long"],
			maxlength: [50, "task must be at most 50 characters long"],
		},
		taskStatus: String,
	},
	{
		timestamps: true,
	}
);

const taskModel = mongoose.model("tasks", taskSchema);

// / Ensure the indexes are created
module.exports = taskModel;
