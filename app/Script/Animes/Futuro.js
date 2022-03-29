const { getHtml } = require('../../helpers');

const DirectorioFuturo = async(res) => {
	const $ = await getHtml('https://myanimelist.net/anime/season/later');
	const Futuros = [];

	$('div.seasonal-anime').each(function() {
		const verifyImg = $(this).find('img').attr('src');
		const anime = {
			title: $(this).find('a.link-title').text().trim(),
			img: verifyImg ? verifyImg : $(this).find('img').attr('data-src'),
			link: $(this).find('a').attr('href'),
		};
		
		Futuros.push(anime);
	});

	res.json({ Futuros });
};

module.exports = DirectorioFuturo;