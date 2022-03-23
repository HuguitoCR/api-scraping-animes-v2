const animesRouter = require('express').Router();
const axios = require('axios');
const cheerio = require('cheerio');

const { ActualizarDir, 
	DirQuery, 
	Directorio, 
	LastEpisodes, 
	MoreInfo, 
	Search, 
	//VerEpisodio 
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
		const getvideo = async () => {
			const lista =[];
			const u = `https://www.animefenix.com/ver/${req.params.id}`;
			const response = await axios(u);
			const $ = cheerio.load(response.data);
		
			const Nombre = $('ul.episode-page__servers-list > li').toArray().map((element) => $(element).text().trim());
			const URL = $('.player-container').find('script').html().match(/(?<=src=["'])([^"'])*/gm);
	
			Nombre.forEach(async(element, index) => {
				const data = await axios(URL[index].replace('amp;', ''));
				const $$ = cheerio.load(data.data);
				const livideo = $$('script').html().match(/(?<=src=["'])([^"'])*/gm).map(it => {
					return it.replace('..', '').replace('/stream/amz.php?', 'https://www.animefenix.com/stream/amz.php').replace('/stream/fl.php?v=https://', 'https://www.animefenix.com/redirect.php?player=22&code=');
				});
		
				lista.push({ Nombre: element, URL: livideo });
		
			});
			setTimeout(() => {
				res.json(lista);
			}, 1000);
		};
		getvideo();
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
