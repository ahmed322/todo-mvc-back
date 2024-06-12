function globalErrorHandler(err, req, res, next) {
	err.statusCode = err.statusCdoe || 500;

	res.status(err.statusCode).json({
		statusCode: err.statusCode,
		message: err.message,
		stack: err.stack,
	});
	next();
}

module.exports = globalErrorHandler;
