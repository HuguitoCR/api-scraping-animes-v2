function errorHandler(err, req, res) {
	res.status(err.status || 500);
	res.send('error', { error: err });
}

module.exports = errorHandler;