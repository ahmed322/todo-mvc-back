const express = require("express");
const path = require("path");

// create app from express
const app = express();
// serve static files from the public folder
let staticFileMiddleware = () =>
	app.use(express.static(path.resolve(__dirname, "public")));

module.exports = staticFileMiddleware;
