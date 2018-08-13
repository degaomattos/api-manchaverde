const express = require('express')
const app = express()
const port = 4000; //porta padrão
app.set('view engine', 'ejs');

app.get('/', function(req, res, next) {
    res.render('login', {message: null});
});

//inicia o servidor
app.listen(port);
console.log('API funcionando!');