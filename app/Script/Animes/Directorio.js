const Redis = require('ioredis');

const Directorio = async(res) => {
	const client = new Redis(process.env.REDIS_URL);
	const reply = await client.get('directorio');
	client.quit();
	res.json({ Directorio: JSON.parse(reply) });
};

module.exports = Directorio;