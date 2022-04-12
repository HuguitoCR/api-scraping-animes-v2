function notFound (req, res, next) {
	res.status(404);
	res.json({ Situation: 'Unable to find this route 📡.'});
}

module.exports = notFound;