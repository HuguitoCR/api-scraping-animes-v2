const animesRouter = require('express').Router();

const { 
	ActualizarDir, 
	//DirQuery, 
	Directorio, 
	LastEpisodes, 
	MoreInfo, 
	Search, 
	VerEpisodio,
	DirectorioFuturo
} = require('../Script/Animes');


animesRouter.get('/lastepisodes', async (req, res, next) => {
	await LastEpisodes(res).catch(err => next(err));
});

animesRouter.get('/futuro', async (req, res, next) => {
	await DirectorioFuturo(res).catch(err => next(err));
});

animesRouter.get('/directorio', async (req, res, next) => {
	await Directorio(res).catch(err => next(err));
});

animesRouter.get('/directorio/actualizar', async (req, res, next) => {
	await ActualizarDir(res).catch(err => next(err));
});

/*animesRouter.get('/directorio/:query', async (req, res) => {
	await DirQuery(req.params.query).then(data => res.json(data)).catch(err => next(err));
});*/

animesRouter.get('/moreinfo/:id', async (req, res, next) => {
	await MoreInfo(req.params.id, res).catch(err => next(err));
});

animesRouter.get('/verepisodio/:id', async (req, res, next) => {
	await VerEpisodio(req.params.id, res).catch(err => next(err));
});

animesRouter.get('/search/:id', async (req, res, next) => {
	await Search(req.params.id, res).catch(err => next(err));
});

module.exports = animesRouter;
