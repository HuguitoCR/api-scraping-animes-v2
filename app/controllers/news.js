const newsRouter = require('express').Router();
const { Reviews, Populares, MasNoticias, Recientes } = require('../Script/News');

newsRouter.get('/masnoticias', async (req , res) => {
	await MasNoticias(res);
});

newsRouter.get('/populares', async (req , res) => {
	await Populares(res);
});

newsRouter.get('/recientes', async (req , res) => {
	await Recientes(res);
});

newsRouter.get('/reviews', async (req , res) => {
	await Reviews(res);
});

module.exports = newsRouter;