const { getHtml } = require('../../helpers');
const Redis = require('ioredis');

const popular = async (res) => {
	const client = new Redis(process.env.REDIS_URL);
	const reply = await client.get('popular');

	if (reply) {
		client.quit();
		res.json({ news: JSON.parse(reply), source: 'cache'});
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

		await client.set('popular', JSON.stringify(news), 'EX', 5400);
		client.quit();
		res.json({ news, source: 'api'});
	}
};

module.exports = popular;