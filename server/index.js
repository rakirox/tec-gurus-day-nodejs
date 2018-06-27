const express  = require('express');
const SERVER = require('http');
const bodyParser = require('body-parser');
var app = express();
var server = SERVER.Server(app);
var io = require('socket.io')(server);
const messages = [
  {
    id: 1,
    text: 'Bienvenido al chat de tec gurus',
    niackname:"Carlos Palmero"
  }
]

io.on("connection", function (socket){
  console.log('El cliente se ha conectado');
  socket.on("agregar-mensaje", function (data){
    console.log('mensaje nuevo');
    console.log(data);
    io.sockets.emit('mensaje',data);
  })
})
console.log('asdasd');


var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/chat')


var Schema   =  mongoose.Schema;

var employee = new Schema ({
  name: {
    type: String,
    required: true
  },
  direccion: {
    type: String
  }
})

var modelEmploye = mongoose.model('Employee', employee);
app.use(bodyParser.json())
app.get('/employee', (req, res) => {
  res.status(200).send(trabajadores);
})
app.get('/employee/:ID', (req, res) => {
  console.log('Revisando donde esta el id');
  console.log(req.params.ID);
  res.status(200).send(trabajadores[req.params.ID]);
})
app.post('/employee', (req, res) => {
  var nuevoEmpleado = new modelEmploye({
    name: 'nuevo nombre',
    direccion: 'avenida siempre viva'
  })
  nuevoEmpleado.save();
  res.status(200).send(nuevoEmpleado)
})
app.delete('/employee/:ID', (req, res) => {
  var deleted = trabajadores[req.params.ID].toString()
  delete trabajadores[req.params.ID]
  res.status(200).send(deleted);
})
app.patch('/employee/:ID', (req, res) => {
  trabajadores[req.params.ID].name = req.body.name;
  res.status(200).send(trabajadores[req.params.ID]);
})
// POST, GET, DELETE, PATCH

// GET /employee -> Lista de todos los trabajadores
// GET /employee/:ID -> Un solo resultado de un trabajador
// POST /employee -> (body [name])
// DELETE /employee/:ID
// PATCH /employee/:ID -> (body [name])

// var trabajadores = {
//   identificador1: {
//     name: 'Juan'
//   },
//   identificador2: {
//     name: 'Jorge'
//   },
//   identificador3: {
//     name: 'Adrian'
//   },
//   identificador4: {
//     name: 'Maria'
//   },
//   identificador5: {
//     name: 'Roberta'
//   }
// }
// var index = 6;
// app.use(bodyParser.json())
// app.get('/employee', (req, res) => {
//   res.status(200).send(trabajadores);
// })
// app.get('/employee/:ID', (req, res) => {
//   console.log('Revisando donde esta el id');
//   console.log(req.params.ID);
//   res.status(200).send(trabajadores[req.params.ID]);
// })
// app.post('/employee', (req, res) => {
//   console.log('revisando cual es el cuerpo de mi body');
//   console.log(req.body);
//   trabajadores['identificador' + index] = req.body
//   res.status(200).send('Hola Mundo');
//   index ++;
// })
// app.delete('/employee/:ID', (req, res) => {
//   var deleted = trabajadores[req.params.ID].toString()
//   delete trabajadores[req.params.ID]
//   res.status(200).send(deleted);
// })
// app.patch('/employee/:ID', (req, res) => {
//   trabajadores[req.params.ID].name = req.body.name;
//   res.status(200).send(trabajadores[req.params.ID]);
// })


app.use(express.static('client'))







// setInterval(() => {
//   io.sockets.emit('mensaje','hola mundo');
// },2000)


server.listen(8080, function(){
  console.log('Ejecutando el servidor');
})
