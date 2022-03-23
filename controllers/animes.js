const animesRouter = require('express').Router();
//const axios = require('axios');
//const cheerio = require('cheerio');

const { ActualizarDir, 
	DirQuery, 
	Directorio, 
	LastEpisodes, 
	MoreInfo, 
	Search, 
	VerEpisodio 
} = require('../Script/Animes');


animesRouter.get('/lastepisodes', async (req, res) => {
	await LastEpisodes().then(data => res.json(data));
});

animesRouter.get('/directorio', async (req, res) => {
	await Directorio().then(data => res.json(data));
});

animesRouter.get('/directorio/actualizar', async (req, res) => {
	await ActualizarDir().then(data => res.json(data));
});

animesRouter.get('/directorio/:query', async (req, res) => {
	await DirQuery(req.params.query).then(data => res.json(data));
});

animesRouter.get('/:opcion/:id', async (req, res) => {
	switch (req.params.opcion) {
	
	case 'moreInfo':
		await MoreInfo(req.params.id).then(animes => {
			res.json(animes);
		});
		break;

	case 'verEpisodio': 
		
		VerEpisodio(req.params.id, res);
		
		break;

	case 'search':
		await Search(req.params.id).then(animes => {                    
			res.json(animes);
		});
		break;

	default:
		res.send('No se encontro la opcion').end();
		break;
	}      
});

module.exports = animesRouter;
