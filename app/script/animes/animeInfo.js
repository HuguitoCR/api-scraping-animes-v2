const { getHtml } = require('../../helpers');

const animeInfo = async (anime, res) => {
	const $ = await getHtml(`https://www.animefenix.com/${anime}`);
	const info = [];
	const episodes = [];

	$('div.columns.is-mobile.is-multiline').each(function() {
		const $this = $(this);
		const verifyNext = $this.find('ul.has-text-light').children('li').children('span.has-text-orange').parent().text().split(':')[1];
		const anime = {
			img: $this.find('img').attr('src'),
			type: $this.find('ul.has-text-light').text().split('\n')[1].split(':')[1].trimStart(),
			state: $this.find('ul.has-text-light').text().split('\n')[2].split(':')[1].replace(' ', ''),
			total_episodes: $this.find('ul.has-text-light').text().split('\n')[3].split(':')[1].trimStart(),
			next_episode:	verifyNext ? verifyNext.trim() : null,
			title: $this.find('h1.title').text(),
			description: $this.find('p.sinopsis').text().replace(/\n/g, ''),
			genres: $this.find('a.button.is-small').text().replace('Á', 'A').replace('Fic', 'fic').split(/(?=[A-Z])/).toString().replace('Ang', 'Áng').replace('fic', 'Fic').split(','),
		};
		info.push(anime);
	});

	$('ul.anime-page__episode-list li').each(function() {
		const $this = $(this);
		const episode = {
			number: parseInt($this.find('a').children('span').text().split(' ')[1]),
			episode_id: $this.find('a').attr('href').split('https://www.animefenix.com/ver/')[1],
		};
		episodes.push(episode);
	});

	res.json({ info: info[0], episodes });
};

module.exports = animeInfo;