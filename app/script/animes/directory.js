const Redis = require('ioredis');

const directory = async(res) => {
	const client = new Redis(process.env.REDIS_URL);
	const reply = await client.get('directory');
	client.quit();
	res.json({ directory: JSON.parse(reply) });
};

module.exports = directory;