const newsRouter = require('express').Router();
const { Reviews, Populares, MasNoticias, Recientes } = require('../Script/News');

newsRouter.get('/masnoticias', async (req, res, next) => {
	await MasNoticias(res).catch(err => next(err));
});

newsRouter.get('/populares', async (req , res, next) => {
	await Populares(res).catch(err => next(err));
});

newsRouter.get('/recientes', async (req, res, next) => {
	await Recientes(res).catch(err => next(err));
});

newsRouter.get('/reviews', async (req, res, next) => {
	await Reviews(res).catch(err => next(err));
});

module.exports = newsRouter;