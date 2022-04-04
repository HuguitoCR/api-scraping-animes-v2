const { getHtml } = require('../../helpers');
const Redis = require('ioredis');

const Recientes = async(res) => {
	const client = new Redis(process.env.REDIS_URL);
	const reply = await client.get('recientes');

	if (reply) {
		client.quit();
		res.json({ noticias: JSON.parse(reply), source: 'cache' });
	}
	else {
		const $ = await getHtml('https://somoskudasai.com/');
		const noticias = [];

		$('.news-list .ar.por').each(function() {
			const noticia = {
				title: $(this).find('a').attr('aria-label'),
				url: $(this).find('a').attr('href'),
				img: $(this).find('img').attr('src'),
				date: $(this).find('span.db').text().trim()
			};
			noticias.push(noticia);
		});

		await client.set('recientes', JSON.stringify(noticias), 'EX', 5400);	
		client.quit();
		res.json({ noticias, source: 'api' });
	}
};
module.exports = Recientes;