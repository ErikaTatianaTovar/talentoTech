const xlsx = require('xlsx');
require('dotenv').config()
const bcrypt = require('bcrypt');

const DB_URL = process.env.DB_URL || '';
const mongoose = require('mongoose'); // Importo la libreria mongoose
mongoose.connect(DB_URL)
const UserSchema = require('./models/User');

//leer archivo excel
const workbook = xlsx.readFile('usuarios.xlsx') //leer archivo
const sheet_list = workbook.SheetNames //objetner lista de hojas excel
const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_list[0]]) //convertir info a json

//transformamos la información de cada usuario, quitando espacios y escribiendo en minuscula
for(const user of data){
    //hashear la clave
    user.email = user.email.trim().toLowerCase()
  const hashedPassword =  bcrypt.hashSync(user.password, 10)
  //setear la contraseña hasheada
    user.password = hashedPassword
//subir información haciendo validaciones uno por uno y si falla un usuario sigue subiendo
    UserSchema({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        id: user.id,
        password: hashedPassword
    }).save().then((result) => {
        console.log("Usuario subido", user.name)
    }).catch((err) => {
    console.log("Error subiendo al usuario", user.name)
    })
}

//subir informacion a bd pasando array
/*UserSchema.insertMany(data).then(() => {
    console.log("Información subida exitosamente")
}).catch( err => console.log("Error subiendo la información", err))*/
