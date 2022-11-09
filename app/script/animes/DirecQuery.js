const axios = require('axios');
const cheerio = require('cheerio');

const DirecQuery = async (query) => {
	const url = `https://www.animefenix.tv/animes?${query}`;
	const Directorio = [];
	const inicio = 1;
	let contador = 0;

	const getData = async () => {
		const response = await axios(url + inicio);
		const $ = cheerio.load(response.data);
		const $paginacion = $('li').last().prev().text();

		const getAnimes = async (page) => {
			const respu = await axios(url + page);
			const HTML = cheerio.load(respu.data);

			HTML('.list-series .serie-card', respu.data).each(function () {
				const id = HTML(this).find('a').attr('href').split('https://www.animefenix.tv/')[1];
				const title = HTML(this).find('a.has-text-orange').text().split('\n').join('');
				const imagen = HTML(this).find('img').attr('src');
				const año = HTML(this).find('span.year').text();
				const estado = HTML(this).find('span.is-orange').text();
				const tipo = HTML(this).find('span.type').text();
				const descripcion = HTML(this).find('p').text().split('\n').join('').split('"').join('');
				Directorio.push({ id, title, imagen, año, estado, tipo, descripcion });
			});

			if (contador < 3) {
				if (page < $paginacion) {
					contador++;
					getAnimes(page + 1);
				} else {
					contador = 0;
					return {
						Anterior: `https://api-torii.vercel.app/api/v1/anime/directorio/${query}&page=${(page - 3)}`,
						Directorio: Directorio
					};
				}
			} else {
				contador = 0;
				return {
					Siguiente: `https://api-torii.vercel.app/api/v1/anime/directorio/${query}&page=${(page + 1)}`,
					Anterior: `https://api-torii.vercel.app/api/v1/anime/directorio/${query}&page=${(page - 3)}`,
					Directorio: Directorio
				};


			}
		};
		getAnimes(inicio);
	};
	getData();

};

module.exports = DirecQuery;