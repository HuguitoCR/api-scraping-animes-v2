const updateDirectory = require('./updateDirectory');
const directory = require('./directory');
const lastEpisodes = require('./lastEpisodes');
const animeInfo = require('./animeInfo');
const search = require('./search');
const watchEpisode = require('./watchEpisode');
const futureAnime = require('./futureAnime');

module.exports = {
	directory,
	updateDirectory,
	lastEpisodes,
	search,
	animeInfo,
	watchEpisode,
	futureAnime
};