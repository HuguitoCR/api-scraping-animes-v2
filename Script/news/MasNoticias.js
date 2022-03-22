const axios = require('axios');
const cheerio = require('cheerio');

const MasNoticias = async() => {
	const html = await axios('https://somoskudasai.com/');
	const $ = cheerio.load(html.data);
	const noticias = [];

	$('div.dg.gt1 article.ar.lg.por').each(function() {
		const noticia = {
			titulo: $(this).find('a').attr('aria-label'),
			url: $(this).find('a').attr('href'),
			imagen: $(this).find('img').attr('src'),
		};
		noticias.push(noticia);
	});

	return noticias;
};

module.exports = MasNoticias;