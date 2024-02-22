const express = require('express') //Importo la libreria
const app = express() //Inicializacion de la variable que usara la libreria
const router = express.Router(); // Enrutar los servicios web
const port = 3000; // Escuchar la ejecucion del servidor
require('dotenv').config()

const socket = require('socket.io') // importar libreria de socket.io
const http = require('http').Server(app) //configurar servidor http
const io = socket(http) // Configuracion de socket.io
//conexion base de datos
const DB_URL = process.env.DB_URL || '';
const mongoose = require('mongoose'); // Importo la libreria mongoose
mongoose.connect(DB_URL) // Creo la cadena de conexion

const userRoutes = require('./routes/UserRoutes');
const housingRoutes = require('./routes/HousingRoutes');
const messageRoutes = require('./routes/MessageRoutes');
const MessageSchema = require('./models/Message');

app.use(express.urlencoded({ extended: true })) // Acceder a la informacion de las urls
app.use(express.json()) // Analizar informacion en formato JSON

//Metodo [GET, POST, PUT, PATCH, DELETE]
// Nombre del servicio [/]
router.get('/', (req, res) => {
    //Informacion a modificar
    res.send("Hello world")
})
//metodos websockets
io.on('connect', (socket) => {
    console.log("Connected")

    socket.on('message', (data) => {
        var payload = JSON.parse(data);
        console.log(payload)
        MessageSchema(payload).save().then((result) => {
            socket.emit('message-receipt', { 'message': 'Mensaje almacenado' })
        }).catch((err) => {
            console.log({ status: "error", message: err.message })
        })
    })

    socket.on('disconnected', (socket) => {
        console.log("disconnected")
    })
})
app.use(express.urlencoded({ extended: true })) // Acceder a la informacion
app.use(express.json()) // Analizar informacion en formato JSON
app.use((req, res, next) => {
    res.io = io
    next()
})
//Ejecuto el servidor
app.use(router)
app.use('/uploads/user', express.static('uploads/user'));
app.use('/', userRoutes)
app.use('/uploads/housing', express.static('uploads/housing'));
app.use('/', housingRoutes)
http.listen(port, () => {
    console.log('Listen on ' + port)
})