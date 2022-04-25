const expressLoader = require('./express');
const { redisClient } =require('../lib');

async function config({ app }){
	await expressLoader({ app }).catch(err => console.log(`Express: error\n${err}`));
	await redisClient.initClient();
}

module.exports = { 
	config,
};