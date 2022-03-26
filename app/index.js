const express = require('express');
const cors = require('cors');
const app = express();
const Home = require('./Rutas.json');


const newsRouter = require('./controllers/news');
const animesRouter = require('./controllers/animes');

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
	res.json(Home);
});

app.use('/api/news', newsRouter);

app.use('/api/anime', animesRouter);


const port = process.env.PORT ||3001;
app.listen(port, () => {
	console.log(`Ya se levanto (el servidor)🥵 http://localhost:${port}`);
});