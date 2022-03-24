const newsRouter = require('express').Router();

/*/ Noticias */
const { Reviews, Populares, MasNoticias, Recientes } = require('../Script/News');

newsRouter.get('/:categoria', async (req , res) => {
	switch (req.params.categoria) {
	case 'masNoticias':
		await MasNoticias().then(noticias => {
			res.json(noticias);
		});
		break;

	case 'populares':
		await Populares().then(noticias => {
			res.json(noticias);
		});
		break;  

	case 'recientes':
		await Recientes().then(noticias => {
			res.json(noticias);
		});
		break;
    
	case 'reviews':
		await Reviews().then(noticias => {
			res.json(noticias);
		});
		break;

	default:
		res.send('No se encontro la categoria').end();
		break;   
	}
});

module.exports = newsRouter;