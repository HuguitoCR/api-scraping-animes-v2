const animesRouter = require('express').Router();

const { 
	directory, 
	updateDirectory,
	futureAnime,
	animeInfo,
	lastEpisodes,
	search,
	watchEpisode
} = require('../Script/Animes');


animesRouter.get('/lastepisodes', async (req, res, next) => {
	await lastEpisodes(res).catch(err => next(err));
});

animesRouter.get('/animeinfo/:id', async (req, res, next) => {
	await animeInfo(req.params.id, res).catch(err => next(err));
});

animesRouter.get('/ver/:id', async (req, res, next) => {
	await watchEpisode(req.params.id, res).catch(err => next(err));
});

animesRouter.get('/search/:id', async (req, res, next) => {
	await search(req.params.id, res).catch(err => next(err));
});

animesRouter.get('/future', async (req, res, next) => {
	await futureAnime(res).catch(err => next(err));
});

animesRouter.get('/directory', async (req, res, next) => {
	await directory(res).catch(err => next(err));
});

animesRouter.get('/directory/update', async (req, res, next) => {
	await updateDirectory(res).catch(err => next(err));
});

module.exports = animesRouter;
