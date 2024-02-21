const mongoose = require('mongoose') // Importando la libreria

// Creando el modelo de housing
const HousingSchema = new mongoose.Schema({
    code: {
        type: String, 
       // required: true,
       // unique: true
    },
    type: {
        type: String, 
        required: true,
        validate: {
            validator: function(type) {            
              return /^(casa|apartamento|finca|edificio|oficina)$/i.test(type);
            },
            message: props => `${props.value} no es un tipo de vivienda válido!`
          }
    },
    state: {
        type: String, 
        required: true,
    },
    city: {
        type: String, 
        required: true,
        validate: {
            validator: function(city) {            
              return /^[a-zA-ZÀ-ÿ\u00f1\u00d1' -]+$/.test(city);
            },
            message: props => `${props.value} no es una ciudad válida!`
          }
    },
    address: {
        type: String, 
        required: true,
       /* validate: {
            validator: function(address) {    
              return /^(CL(LE)?|C(?:RA?|ARRERA)|DG|DIAG|TV|TRAN(?:S(?:V|VERSAL)?|V)|AV(?:ENIDA)?(?:\s+(?:CALLE|CARRERA))?)\s([1-9][0-9]?)\s?([a-zA-Z]?){1,5}(\#?\s?\d[1-9][0-9]?)\s([a-zA-Z]?){1,5}?$/i.test(address);
            },
            message: props => `${props.value} no es una dirección válida!`
          }*/
    },
    zip_code: {
        type: Number, 
        required: true,
    },
    price: {
        type: Number, 
        required: true,
        validate: {
            validator: function(price) {            
                return /^(?!0*(?:[.,]0*)?$)(?:\d+|[1-9]\d{0,2}(?:([.,]\d{3})*|\d*))([.,]\d+)?$|^1000000([.,]0+)?$/.test(price);
        },
        message: props => `${props.value} no es un precio válido!`
        }
    },
    size: {
        type: Number, 
        required: true,
    },
    rooms: {
        type: Number, 
        required: true,
    },
    bathrooms: {
        type: Number, 
        required: true,
    },
    parking: {
        type: Boolean, 
        required: true,
    },
    image: {
        type: String, 
       // required: true,
        validate: {
            validator: function(image) {            
                return /\.(jpg|jpeg|png|svg)$/i.test(image);
            },
            message: props => `${props.value} no es un formato de imagen válido!`
            },
    }
})

module.exports = mongoose.model('housing', HousingSchema) 