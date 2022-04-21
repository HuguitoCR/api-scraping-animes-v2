const express = require('express');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const Home = require('./rutas.json');

const newsRouter = require('./controllers/news');
const animesRouter = require('./controllers/animes');
const { notFound, errorHandler } = require('./middlewares');

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());

app.get('/', (req, res) => {
	res.json(Home);
});

app.use('/api/news', newsRouter);
app.use('/api/anime', animesRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT ||3001;
app.listen(port, () => {
	console.log(`Ya se levanto (el servidor)🥵 http://localhost:${port}`);
});