const express = require('express') //importar libreria
const app = express() //inicializar variable que usa la libreria
const router = express.Router() //enrutar servicios web
const port = 3000 //escuchar la ejecucion del sewrvidor
const UserSchema = require('./models/User.js')

const mongoose = require('mongoose') //importar libreria
mongoose.connect("mongodb+srv://ErikaTovar:tati25tovar@cluster0.mjo7nb8.mongodb.net/talentotech")

const userRoutes = require('./routes/UserRoutes')


app.use(express.urlencoded({extended:true})) //ACCEDER A LAS INFOS DE LA URLS
app.use(express.json()) //Analizar la info en json

//Ejecuto el servidor
app.use(router)
app.use('/', userRoutes)
app.listen(port, () => {
    console.log('Listen on ' + port)
})