const express = require('express');
const app = express();
const Home = require('./Rutas.json');

const newsRouter = require('./controllers/news');


/*/  Animes  */
const { LastEpisodes } = require('./Script/Animes/LastEpisodes.js');
const { MoreInfo } = require('./Script/Animes/MoreInfo.js');
const { VerEpisodio } = require('./Script/Animes/VerEpisodio.js');


app.get('/', (req, res) => {
    res.json(Home);
})

app.use('/api/news', newsRouter);

app.get('/api/anime/:opcion/:id', (req, res) => {
      switch (req.params.opcion) {
        case 'lastEpisodes':
            LastEpisodes().then(animes => {
                res.json(animes);
            });
            break;
        case 'moreInfo':
          MoreInfo(req.params.id).then(animes => {
            res.json(animes);
            });
            break;

        case 'verEpisodio':
            
          VerEpisodio(req.params.id).then(animes => {   
            res.json(animes);
            });
    
            

            break;
        default:
            res.send('No se encontro la opcion').end();
            break;
             
      }
      









})




const port = 3001;

app.listen(port, () => {
    console.log(`Ya se levanto (el servidor)🥵 http://localhost:${port}`);
});