const mongoose = require("mongoose");
const dbURI = "mongodb://localhost:27017";

let dbConnection = () => {
	mongoose
		.connect(dbURI)
		.then(() => {
			console.log("connected to mongodb at " + dbURI);
		})
		.catch((err) => {
			console.log("error connecting to mongodb at " + dbURI);
			console.log(err);
		});
};
module.exports = dbConnection;
