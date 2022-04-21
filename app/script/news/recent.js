const { getHtml } = require('../../helpers');
const Redis = require('ioredis');

const recent = async (res) => {
	const client = new Redis(process.env.REDIS_URL);
	const reply = await client.get('recent');

	if (reply) {
		client.quit();
		res.json({ news: JSON.parse(reply), source: 'cache' });
	}
	else {
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

		await client.set('recent', JSON.stringify(news), 'EX', 5400);	
		client.quit();
		res.json({ news, source: 'api' });
	}
};
module.exports = recent;