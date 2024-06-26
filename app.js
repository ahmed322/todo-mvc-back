const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const ApiError = require("./utils/apiErrorHandler");
const globalErrorHandler = require("./middlewares/ErrorHandleMiddleware");
// mdiddle wares
const dbConnection = require("./config/dbConeection");
const staticFileMiddleware = require("./middlewares/middleStatic");
const dotenv = require("dotenv");
dotenv.config();

// routes
const taskRoute = require("./routes/taskRoute");
// connect to data base
dbConnection();

// create app from express
const app = express();

// middlewares
// morganMiddleware();

// user moragn in dev server only
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
staticFileMiddleware();

// serve static files from the public folder
app.use(express.static(path.resolve(__dirname, "public")));

//mount routes
app.use("/api/v1/tasks", taskRoute);
// handle routes error

app.get("*", (req, res, next) => {
	next(new ApiError(`cant find this route ${req.originalUrl}`, 404));
});

// global handle error
app.use(globalErrorHandler);
// start server
const serverPort = process.env.PORT || 3000;
app.listen(3000, () => {
	console.log("you app is runing in port " + serverPort);
});
