const Redis = require('ioredis');

const Directorio = async() => {
	const client = new Redis(process.env.REDIS_URL);
	const reply = await client.get('directorio');
	client.quit();
	return JSON.parse(reply);
};

module.exports = Directorio;