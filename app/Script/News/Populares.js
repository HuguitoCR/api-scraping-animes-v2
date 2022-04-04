const { getHtml } = require('../../helpers');
const Redis = require('ioredis');

const Populares = async(res) => {
	const client = new Redis(process.env.REDIS_URL);
	const reply = await client.get('populares');

	if (reply) {
		client.quit();
		res.json({ noticias: JSON.parse(reply), source: 'cache'});
	}
	else {
		const $ = await getHtml('https://somoskudasai.com/');
		const noticias = [];

		$('.ar-featured .swiper-slide').each(function() {
			const noticia = {
				title: $(this).find('a').attr('aria-label'),
				url: $(this).find('a').attr('href'),
				img: $(this).find('img').attr('src'),
			};
			noticias.push(noticia);
		});

		await client.set('populares', JSON.stringify(noticias), 'EX', 5400);
		client.quit();
		res.json({ noticias, source: 'api'});
	}
};

module.exports = Populares;