const express = require('express');
const app = express();
const Home = require('./Rutas.json');

const newsRouter = require('./controllers/news');


/*/  Animes  */
const LastEpisodes = require('./Script/Animes/LastEpisodes.js');
const  MoreInfo  = require('./Script/Animes/MoreInfo.js');
const  VerEpisodio = require('./Script/Animes/VerEpisodio.js');
const Search  = require('./Script/Animes/Search.js');
const Directorio  = require('./Script/Animes/Directorio.js');
const ActualizarDirectorio  = require('./Script/Animes/ActualizarDirectorio.js');
const DirecQuery  = require('./Script/Animes/DirecQuery.js');



app.get('/', (req, res) => {
	res.json(Home);
});

app.use('/api/news', newsRouter);


app.get('/api/anime/lastepisodes', (req, res) => {
	LastEpisodes().then(data => res.json(data));
});


app.get('/api/anime/directorio', (req, res) => {
	Directorio().then(data => res.json(data));
});


app.get('/api/anime/directorio/actualizar', (req, res) => {
	ActualizarDirectorio().then(data => res.json(data));
});

app.get('/api/anime/directorio/:query', (req, res) => {
	DirecQuery(req.params.query).then(data => res.json(data));
});

app.get('/api/anime/:opcion/:id', (req, res) => {
	switch (req.params.opcion) {
	
	case 'moreInfo':
		MoreInfo(req.params.id).then(animes => {
			res.json(animes);
		});
		break;

	case 'verEpisodio':
            
		VerEpisodio(req.params.id).then(animes => {   
			res.json(animes);
		});
		break;

	case 'search':
		Search(req.params.id).then(animes => {                      
			res.json(animes);
		});
		break;

	default:
		res.send('No se encontro la opcion').end();
		break;
    
	}      









});




const port = 3001;

app.listen(port, () => {
	console.log(`Ya se levanto (el servidor)🥵 http://localhost:${port}`);
});