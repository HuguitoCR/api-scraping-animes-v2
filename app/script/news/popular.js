const { getHtml } = require('../../helpers');
const { redisClient } = require('../../lib');

const popular = async (res) => {
	const reply = await redisClient.getKey('popular');

	if (reply) {
		res.json({ news: JSON.parse(reply), source: 'cache' });
	}
	else {
		const $ = await getHtml('https://somoskudasai.com/');
		const news = [];

		$('.ar-featured .swiper-slide').each(function() {
			const $this = $(this);
			const newsObject = {
				title: $this.find('a').attr('aria-label'),
				url: $this.find('a').attr('href'),
				img: $this.find('img').attr('src'),
			};
			news.push(newsObject);
		});

		await redisClient.setKeyWithEx('popular', JSON.stringify(news), 5400);
		res.json({ news, source: 'api'});
	}
};

module.exports = popular;