const { getHtml } = require('../../helpers');



const DirectorioFuturo = async(res) => {
	const $ = await getHtml('https://myanimelist.net/anime/season/later');
	const Futuros = [];
	$('div.seasonal-anime').is(function() {
		const title = $(this).find('a.link-title').text().trim();
		let img = '';
		if ($(this).find('img').attr('src')) {
			img = $(this).find('img').attr('src');
		}
		else {
			img = $(this).find('img').attr('data-src');
		}

		const link = $(this).find('a').attr('href');
		
		Futuros.push({ title, img, link });
	});

	res.json({ Futuros });
};

module.exports = DirectorioFuturo;