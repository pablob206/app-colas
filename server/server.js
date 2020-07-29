const express = require('express'); //cargamos libreria de express
const socketIO = require('socket.io'); //cargamos libreria de socket
const http = require('http'); //socketIO no trabaja directamente con express, pero si con servidor http por eso cargamos la libreria http (lo trae por defecto node, no npm install)

const path = require('path'); //cargamos libreria de path

const app = express(); //inicializamos express
let server = http.createServer(app); //creamos el server http y enviamos por parametro el app de express

const publicPath = path.resolve(__dirname, '../public'); //creamos publicpath para compartir y hacer publica la carpeta public
const port = process.env.PORT || 3000; //seleccion de puerto de desarrollo o produccion

app.use(express.static(publicPath)); //usamos middleware para habilitar la carpeta publica

//(IO = esta es la comunicacion del backend) inicializamos el socketIO
module.exports.io = socketIO(server);
require('./sockets/socket');




//Se activa el server con el port
server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});