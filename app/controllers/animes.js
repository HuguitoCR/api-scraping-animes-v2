const animesRouter = require('express').Router();

const { 
	ActualizarDir, 
	DirQuery, 
	Directorio, 
	LastEpisodes, 
	MoreInfo, 
	Search, 
	VerEpisodio,
	DirectorioFuturo
} = require('../Script/Animes');


animesRouter.get('/lastepisodes', async (req, res) => {
	await LastEpisodes(res);
});

animesRouter.get('/futuro', async (req, res) => {
	await DirectorioFuturo(res);
});

animesRouter.get('/directorio', async (req, res) => {
	await Directorio(res);
});

animesRouter.get('/directorio/actualizar', async (req, res) => {
	await ActualizarDir(res);
});

animesRouter.get('/directorio/:query', async (req, res) => {
	await DirQuery(req.params.query).then(data => res.json(data));
});

animesRouter.get('/moreInfo/:id', async (req, res) => {
	await MoreInfo(req.params.id, res);
});

animesRouter.get('/verEpisodio/:id', async (req, res) => {
	await VerEpisodio(req.params.id, res);
});

animesRouter.get('/search/:id', async (req, res) => {
	await Search(req.params.id, res);
});

module.exports = animesRouter;
