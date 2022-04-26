const { getHtml } = require('../../helpers');
const { redisClient } = require('../../lib');

const recent = async (res) => {
	const reply = await redisClient.getKey('recent');

	if (reply) {
		res.json({ news: JSON.parse(reply), source: 'cache' });
	} else {
		const $ = await getHtml('https://somoskudasai.com/');
		const news = [];

		$('.news-list .ar.por').each(function() {
			const $this = $(this);
			const newsObject = {
				title: $this.find('a').attr('aria-label'),
				url: $this.find('a').attr('href'),
				img: $this.find('img').attr('src'),
				date: $this.find('span.db').text().trim()
			};
			news.push(newsObject);
		});

		await redisClient.setKeyWithEx('recent', JSON.stringify(news), 5400);
		res.json({ news, source: 'api' });
	}
};
module.exports = recent;