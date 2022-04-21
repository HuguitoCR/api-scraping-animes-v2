const { getHtml } = require('../../helpers');
const Redis = require('ioredis');

const updateDirecotry = async (res) => {
	const client = new Redis(process.env.REDIS_URL);
	const directory = [];

	const element = await getHtml('https://www.animefenix.com/animes?page=1');
	const lastPage = element('li').last().prev().text();

	for (let i = 1 ; i<= lastPage; i++){
		const $ = await getHtml(`https://www.animefenix.com/animes?page=${i}`);
		$('.list-series .serie-card').each(function() {
			const $this = $(this);
			const anime = {
				id: $this.find('a').attr('href').split('https://www.animefenix.com/')[1],
				title: $this.find('a.has-text-orange').text().split('\n').join(''),
				img: $this.find('img').attr('src'),
				year: $this.find('span.year').text(),
				state: $this.find('span.is-orange').text(),
				type: $this.find('span.type').text(),
				description: $this.find('p').text().split('\n').join('').split('"').join(''),
			};
			directory.push(anime);
		});
	}
		
	client.set('directory', JSON.stringify(directory));
	client.quit();
	res.json({ status: 'ok' });
};

module.exports = updateDirecotry;