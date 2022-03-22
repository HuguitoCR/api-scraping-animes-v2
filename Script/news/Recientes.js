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
		const url = 'https://somoskudasai.com/';
		const result = await axios.get(url);	
		const $ = cheerio.load(result.data);
		const noticias = [];

		$('.news-list .ar.por').each((i, elem) => {
			const noticia = {
				titulo: $(elem).find('a').attr('aria-label'),
				url: $(elem).find('a').attr('href'),
				img: $(elem).find('img').attr('src'),
				fecha: $(elem).find('span.db').text().trim()
			};
			noticias.push(noticia);
		});
		
	  await client.set('recientes', JSON.stringify(noticias), 'EX', 5400);			
		client.quit();
		return noticias;	 
	}
}

module.exports = Recientes;