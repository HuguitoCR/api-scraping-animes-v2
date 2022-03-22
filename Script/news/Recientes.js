const axios = require('axios');
const cheerio = require('cheerio');
const Redis = require('ioredis');

const Recientes = async() => {
	const client = new Redis(process.env.REDIS_URL);
	const reply = await client.get('recientes');

	if (reply) {
		client.quit();
		return JSON.parse(reply);
	}
	else {
		const html = await axios('https://somoskudasai.com/');
		const $ = cheerio.load(html.data);
		const noticias = [];

		$('.news-list .ar.por').each(function() {
			const noticia = {
				titulo: $(this).find('a').attr('aria-label'),
				url: $(this).find('a').attr('href'),
				img: $(this).find('img').attr('src'),
				fecha: $(this).find('span.db').text().trim()
			};
			noticias.push(noticia);
		});

		await client.set('recientes', JSON.stringify(noticias), 'EX', 5400);	
		client.quit();
		return noticias;
	}
};

module.exports = Recientes;