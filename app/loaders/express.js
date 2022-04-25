const express = require('express');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');

async function expressConfig({ app }){
	app.use(cors());
	app.use(helmet());
	app.use(compression());
	app.use(express.json());
	
	console.log('Express: configuration loaded');
}

module.exports = expressConfig;