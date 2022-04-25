const Redis = require('ioredis');

const client = new Redis(process.env.REDIS_URL, { lazyConnect: true });

async function initClient(){
	try{
		await client.connect();
		console.log(`Redis connection: ${client.status}`);
	}
	catch(ex){
		console.log(`Redis ${ex}`);
		client.disconnect();
	}
}

/**
 * @description Get the value of a key
 * @param {Redis.KeyType} key 
 * @returns {Promise<string>} 
 */
async function getKey(key){
	return client.get(key);
}

/**
 * @description Set the string value of a key with expiration time
 * @param {Redis.KeyType} key
 * @param {Redis.ValueType} value
 * @param {Number} time in miliseconds 
 * @returns {Promise<"OK">}
 */
async function setKeyWithEx(key, value, time) {
	client.set(key, value, 'EX', time);
}

/**
 * @description Set the string value of a key
 * @param {Redis.KeyType} key 
 * @param {Redis.ValueType} value 
 * @returns {Promise<"OK">}
 */
async function setKey(key, value) {
	client.set(key, value);
}

module.exports = {
	initClient,
	getKey,
	setKey,
	setKeyWithEx
};