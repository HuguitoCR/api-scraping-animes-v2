const { getHtml } = require('../../helpers');

const MasNoticias = async(res) => {
	const $ = await getHtml('https://somoskudasai.com/');
	const noticias = [];

	$('div.dg.gt1 article.ar.lg.por').each(function() {
		const noticia = {
			title: $(this).find('a').attr('aria-label'),
			url: $(this).find('a').attr('href'),
			img: $(this).find('img').attr('src'),
		};
		noticias.push(noticia);
	});

	res.json({ noticias });
};

module.exports = MasNoticias;