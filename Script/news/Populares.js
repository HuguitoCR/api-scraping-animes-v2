const axios = require('axios');
const cheerio = require('cheerio');
const Redis = require('ioredis');

const Populares = async() => {
	const client = new Redis(process.env.REDIS_URL);
	const reply = await client.get('populares');

	if (reply) {
		client.quit();
		return JSON.parse(reply);
	}
	else {
		const html = await axios('https://somoskudasai.com/');
		const $ = cheerio.load(html.data);
		const noticias = [];

		$('.ar-featured .swiper-slide').each(function() {
			const noticia = {
				titulo: $(this).find('a').attr('aria-label'),
				url: $(this).find('a').attr('href'),
				img: $(this).find('img').attr('src'),
			};
			noticias.push(noticia);
		});

		await client.set('populares', JSON.stringify(noticias), 'EX', 5400);
		client.quit();
		return noticias;
	}
};

module.exports = Populares;
