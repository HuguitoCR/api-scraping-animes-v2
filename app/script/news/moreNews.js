const { getHtml } = require('../../helpers');

const moreNews = async (res) => {
	const $ = await getHtml('https://somoskudasai.com/');
	const news = [];

	$('div.dg.gt1 article.ar.lg.por').each(function() {
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

module.exports = moreNews;