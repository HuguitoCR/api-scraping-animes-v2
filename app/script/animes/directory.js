const { redisClient } = require('../../lib');

const directory = async(res) => {
	const reply = await redisClient.getKey('directory');
	res.json({ directory: JSON.parse(reply) });
};

module.exports = directory;