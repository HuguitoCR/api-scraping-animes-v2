const newsRouter = require('express').Router();
const { reviews, popular, moreNews, recent, search } = require('../script/news');

newsRouter.get('/more', async (req, res, next) => {
	await moreNews(res).catch(err => next(err));
});

newsRouter.get('/popular', async (req, res, next) => {
	await popular(res).catch(err => next(err));
});

newsRouter.get('/recent', async (req, res, next) => {
	await recent(res).catch(err => next(err));
});

newsRouter.get('/reviews', async (req, res, next) => {
	await reviews(res).catch(err => next(err));
});

newsRouter.get('/search/:Search', async (req, res, next) => {
	await search(req.params.Search, res).catch(err => next(err));
});
module.exports = newsRouter;