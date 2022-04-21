const newsRouter = require('express').Router();
const { reviews, popular, moreNews, recent } = require('../Script/News');

newsRouter.get('/more', async (req, res, next) => {
	await moreNews(res).catch(err => next(err));
});

newsRouter.get('/popular', async (req , res, next) => {
	await popular(res).catch(err => next(err));
});

newsRouter.get('/recent', async (req, res, next) => {
	await recent(res).catch(err => next(err));
});

newsRouter.get('/reviews', async (req, res, next) => {
	await reviews(res).catch(err => next(err));
});

module.exports = newsRouter;