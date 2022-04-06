function errorHandler (req, res) {
	res.status(404);
	res.json({ Situation: 'Unable to find this route 📡.'});
}

module.exports = errorHandler;