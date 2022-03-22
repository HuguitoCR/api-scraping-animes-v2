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
		const url = 'https://somoskudasai.com/';
		const result = await axios.get(url);	
		const $ = cheerio.load(result.data);
		const noticias = [];

    $('.ar-featured .swiper-slide').each((i, elem) => {
			const noticia = {
				titulo: $(elem).find('a').attr('aria-label'),
				url: $(elem).find('a').attr('href'),
				img: $(elem).find('img').attr('src'),
			};
		noticias.push(noticia);
		});

	  await client.set('populares', JSON.stringify(noticias), 'EX', 5400);			
		client.quit();
		return noticias;
	}
}

module.exports = Populares;
