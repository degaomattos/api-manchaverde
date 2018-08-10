const express = require('express')
const config = require('./config')
const news = express()
var mysql = require('mysql')
var connection = mysql.createConnection(config);
connection.connect();
let noticias = '';

connection.query('SELECT * FROM noticias_app', function(err, rows, fields) {
    if (err) throw err;
    noticias = rows;
})

news.get('/noticias', (req, res) => res.send(noticias))
news.listen(4000, () => console.log('Api porta 4000!'))