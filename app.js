const express = require('express')
const config = require('./config')
const news = express()
const bodyParser = require('body-parser');
const port = 5000; //porta padr達o
var mysql = require('mysql')

news.use(bodyParser.urlencoded({ extended: true }));
news.use(bodyParser.json());
const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
news.use('/', router);

//inicia o servidor
news.listen(port);
console.log('API funcionando!');

// Listar todas noticias
router.get('/manchaverde/app/noticias', (req, res) =>{
    execSQLQuery('SELECT * FROM noticias_app', res);
})

// Listar galeria
router.get('/manchaverde/app/galeria', (req, res) =>{
    execSQLQuery('SELECT * FROM galeria_app', res);
})

// Listar galeria
router.get('/manchaverde/app/subsedes', (req, res) =>{
    execSQLQuery('SELECT * FROM subsedes_app', res);
})

// Listar noticias filtrada
router.get('/manchaverde/app/noticias/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM noticias_app' + filter, res);
})

// Listar galeria filtrada
router.get('/manchaverde/app/galeria/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM galeria_app' + filter, res);
})

// Listar subsedes filtrada
router.get('/manchaverde/app/subsedes/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM subsedes_app' + filter, res);
})

// // Delete noticias
// router.delete('/noticias/:id', (req, res) =>{
//     execSQLQuery('DELETE FROM noticias_app WHERE ID=' + parseInt(req.params.id), res);
// })

// router.post('/noticias', (req, res) =>{
//     const titulo = req.body.titulo.substring(0,250);
//     const img = req.body.img.substring(0,1000);
//     const conteudo = req.body.conteudo.substring(0,10000);
//     execSQLQuery(`INSERT INTO noticias_app(titulo, img, conteudo) VALUES('${titulo}','${img}', '${conteudo}')`, res);
// });

// router.patch('/noticias/:id', (req, res) =>{
//     const id = parseInt(req.params.id);
//     const titulo = req.body.titulo.substring(0,250);
//     const img = req.body.img.substring(0,1000);
//     const conteudo = req.body.conteudo.substring(0,10000);
//     execSQLQuery(`UPDATE noticias_app SET titulo='${titulo}', img='${img}', conteudo='${conteudo}' WHERE ID=${id}`, res);
// })

function execSQLQuery(sqlQry, res){
  const connection = mysql.createConnection(config);
 
  connection.query(sqlQry, function(error, results, fields){
      if(error) 
        res.json(error);
      else
        res.json(results);
      connection.end();
      console.log('executou!');
  });
}