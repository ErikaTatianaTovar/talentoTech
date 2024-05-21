const express = require("express"); //Importo la libreria
const app = express(); //Inicializacion de la variable que usara la libreria
const router = express.Router(); // Enrutar los servicios web
const port = process.env.PORT || 3000; // Escuchar la ejecucion del servidor
const http = require('http').Server(app);
const path = require('path')
const cors = require('cors')
//const socket = require("socket.io"); // importar libreria de socket.io

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//!NOTE: disabled Websocket
//const io = socket(http); // Configuracion de socket.io

const { createYoga } = require("graphql-yoga");
const schema = require("./graphql/schema");

//conexion base de datos
const DB_URL = process.env.DB_URL || "";
const mongoose = require("mongoose"); // Importo la libreria mongoose
mongoose.connect(DB_URL); // Creo la cadena de conexion

const db = mongoose.connection;
db.on('error', (error) => {
  console.error('Error de conexión a la base de datos:', error);
});
db.once('open', () => {
  console.log('Conexión exitosa a la base de datos');
});

router.get('/', (req, res) => {
  res.send('Hello world');
})

app.use(cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
  'https://talento-tech-l6lqcddm6-erika-tovars-projects.vercel.app'
]
if (ACCEPTED_ORIGINS.includes(origin)){
  return callback(null, true)
}
if (!origin) {
  return callback(null, true)
}
return callback(new Error('Not allowed by CORS'))
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
  }));

app.use(express.urlencoded({extended: true})) // Acceder a la informacion de las urls

app.use(express.json()) // Analizar informacion en formato JSON

const userRoutes = require("./routes/UserRoutes");
const housingRoutes = require("./routes/HousingRoutes");
const messageRoutes = require("./routes/MessageRoutes");


//!NOTE: disabled Websocket
/** Metodos websocket */
//io.on("connect", (socket) => {
// console.log("connected");
//Escuchando eventos desde el servidor
// socket.on("message", (data) => {
/** Almacenando el mensaje en la BD */
//  var payload = JSON.parse(data);
// console.log(payload);
/** Lo almaceno en la BD */
//  MessageSchema(payload)
//  .save()
//  .then((result) => {
/** Enviando el mensaje a todos los clientes conectados al websocket */
//    socket.broadcast.emit("message-receipt", result);
//  })
//   .catch((err) => {
// console.log({ status: "error", message: err.message });
//   });
// });

// socket.on("disconnect", (socket) => {
//  console.log("disconnect");
// });
//});
//app.use((req, res, next) => {
//  res.io = io;
////  next();
//});

const yoga = new createYoga({ schema });
app.use("/graphql", yoga);

//Ejecuto el servidor
app.use(router);
app.use("/uploads/user", express.static("uploads/user"));
app.use("/", userRoutes);
app.use("/uploads/housing", express.static("uploads/housing"));
app.use("/", housingRoutes);
app.use("/", messageRoutes);

app.listen(port, () => {
  console.log('Listen on http://localhost:' + port)
})

module.exports = http;
