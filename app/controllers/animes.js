const animesRouter = require('express').Router();

const { ActualizarDir, 
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

animesRouter.get('/:opcion/:id', async (req, res) => {
	switch (req.params.opcion) {
	
	case 'moreInfo':
		await MoreInfo(req.params.id, res);
		break;

	case 'verEpisodio': 
		await VerEpisodio(req.params.id, res);
		break;

	case 'search':
		await Search(req.params.id, res);
		break;

	default:
		res.send('No se encontro la opcion').end();
		break;
	}      
});

module.exports = animesRouter;
