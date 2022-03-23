const { getHtml } = require('../../helpers');

const MasNoticias = async() => {
	const $ = await getHtml('https://somoskudasai.com/');
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