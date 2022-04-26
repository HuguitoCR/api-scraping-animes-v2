const express = require('express');
const load = require('./loaders');

const home = require('./routes.json');
const newsRouter = require('./controllers/news');
const animesRouter = require('./controllers/animes');
const { notFound, errorHandler } = require('./middlewares');

(async () => {
	const app = express();
	await load.config({ app });

	app.get('/', (req, res) => {
		res.json(home);
	});
	app.use('/api/news', newsRouter);
	app.use('/api/anime', animesRouter);

	app.use(notFound);
	app.use(errorHandler);

	const port = process.env.PORT || 3001;
	app.listen(port, () => {
		console.log(`\nYa se levanto (el servidor)🥵 http://localhost:${port}`);
	});
})();