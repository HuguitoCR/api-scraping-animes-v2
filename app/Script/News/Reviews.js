const { getHtml } = require('../../helpers');

const reviews = async (res) => {
	const $ = await getHtml('https://somoskudasai.com/');
	const news = [];
	
	$('.ar-reviews .swiper-slide').each(function() {
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

module.exports = reviews;