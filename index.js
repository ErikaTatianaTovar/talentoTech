const express = require('express') //Importo la libreria
const app = express() //Inicializacion de la variable que usara la libreria
const router = express.Router(); // Enrutar los servicios web
const port = 3000; // Escuchar la ejecucion del servidor
require('dotenv').config()

const DB_URL = process.env.DB_URL || '';

const mongoose = require('mongoose'); // Importo la libreria mongoose
mongoose.connect(DB_URL) // Creo la cadena de conexion

const userRoutes = require('./routes/UserRoutes');

app.use(express.urlencoded({extended: true})) // Acceder a la informacion de las urls
app.use(express.json()) // Analizar informacion en formato JSON

//Metodo [GET, POST, PUT, PATCH, DELETE]
// Nombre del servicio [/]
router.get('/', (req, res) => {
    //Informacion a modificar
    res.send("Hello world")
})

//Ejecuto el servidor
app.use(router)
app.use('/uploads', express.static('uploads'));
app.use('/', userRoutes)
app.listen(port, () => {
    console.log('Listen on ' + port)
})