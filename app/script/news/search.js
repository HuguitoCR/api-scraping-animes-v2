const { getHtml } = require('../../helpers');


const search = async (Search, res) => {
	const sea = Search.replace(' ', '+');
	const $ = await getHtml(`https://somoskudasai.com/?s=${sea}`);
	const news = [];
	$('div.nwslst.dg.gg1.gt1 article.ar.por').each(function () {
		const $this = $(this);
		const newsObject = {
			title: $this.find('a').attr('aria-label'),
			url: $this.find('a').attr('href'),
			img: $this.find('img').attr('src'),
		};
		news.push(newsObject);
	});

	res.json({ news });
};

module.exports = search;