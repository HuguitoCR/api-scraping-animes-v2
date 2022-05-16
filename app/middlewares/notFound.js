function notFound(req, res) {
	res.status(404);
	res.json({ Situation: 'Unable to find this route 📡.' });
}

module.exports = notFound;