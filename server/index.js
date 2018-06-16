//Creado
// import express from 'express'; //nueva version de js
const express  = require('express'); //la vieja version de nodejs-js
const SERVER = require('http');
var app = express();
var server = SERVER.Server(app);

//Arrow functions
app.get('/hola', (req, res) => {
  res.status(200).send('Hola Mundo');
})


server.listen(8080, function(){
  console.log('Ejecutando el servidor');
})
