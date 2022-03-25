const axios = require('axios');
const cheerio = require('cheerio');
const Redis = require('ioredis');

const ActualizarDirectorio = async(res) => {
	const client = new Redis(process.env.REDIS_URL);
	const url = 'https://www.animefenix.com/animes?page=';
	const Directorio = [];
	const inicio = 1;

	const getData = async () => {
		const response = await axios(url + inicio);
		const $ = cheerio.load(response.data);
		const $paginacion = $('li').last().prev().text();

		const getAnimes = async (page) => {
			const respu = await axios(url + page);
			const HTML = cheerio.load(respu.data);

			HTML('.list-series .serie-card', respu.data).each(function() {
				const id = HTML(this).find('a').attr('href').split('https://www.animefenix.com/')[1];
				const title = HTML(this).find('a.has-text-orange').text().split('\n').join('');
				const img = HTML(this).find('img').attr('src');
				const año = HTML(this).find('span.year').text();
				const estado = HTML(this).find('span.is-orange').text();
				const tipo = HTML(this).find('span.type').text();
				const descripcion = HTML(this).find('p').text().split('\n').join('').split('"').join('');
				Directorio.push({ id, title, img, año, estado, tipo, descripcion });
			});


			if (page < $paginacion) {
				getAnimes(page + 1);
			}
			else {
				client.set('directorio', JSON.stringify(Directorio));
				client.quit();
				res.json([{ status: 'ok' }]);
			}
		};
		getAnimes(inicio);
	};
	getData();

};

module.exports = ActualizarDirectorio;