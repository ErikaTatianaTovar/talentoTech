const mongoose = require("mongoose"); // Importando la libreria

// Creando el modelo de housing
const HousingSchema = new mongoose.Schema({
  code: {
    type: String,
  },
  type: {
    type: String,
    required: true,
    validate: {
      validator: function (type) {
        return /^(casa|apartamento|finca|edificio|oficina)$/i.test(type);
      },
      message: (props) => `${props.value} no es un tipo de vivienda válido!`,
    },
  },
  department: {
    type: String,
    required: true,
    validate: {
      validator: async function (department) {
        // Validacion del departamento
        var response = await fetch(
          "https://api-colombia.com/api/v1/Department"
        );
        var departments = await response.json();
        return departments.some((department) =>
          department.name.toUpperCase().includes(department.toUpperCase())
        );
      },
      message: (props) => "$(props.value) no es un Departamento de Colombia!",
    },
  },
  city: {
    type: String,
    required: true,
    validate: {
      validator: async function (city) {
        // Validacion de ciudad
        var response = await fetch("https://api-colombia.com/api/v1/City");
        var cities = await response.json();
        return cities.some((object) =>
          object.name.toUpperCase().includes(city.toUpperCase())
        );
      },
      message: (props) => "$(props.value) no es una ciudad de Colombia!",
    },
  },
  address: {
    type: String,
    required: true,
  },
  zip_code: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: function (price) {
        return /^(?!0*(?:[.,]0*)?$)(?:\d+|[1-9]\d{0,2}(?:([.,]\d{3})*|\d*))([.,]\d+)?$|^1000000([.,]0+)?$/.test(
          price
        );
      },
      message: (props) => `${props.value} no es un precio válido!`,
    },
  },
  size: {
    type: Double,
    required: true,
    validate: {
      validator: function (size) {
        return /^(10000|[1-9]\d|\d)$/.test(size);
      },
      message: (props) => `${props.value} no es un tamaño válido!`,
    },
  },
  rooms: {
    type: Number,
    required: true,
    validate: {
      validator: function (rooms) {
        return /^(100|[1-9]\d|\d)$/.test(rooms);
      },
      message: (props) =>
        `${props.value} no es un numero de habitaciones válido!`,
    },
  },
  bathrooms: {
    type: Number,
    required: true,
    validate: {
      validator: function (bathrooms) {
        return /^(100|[1-9]\d|\d)$/.test(bathrooms);
      },
      message: (props) => `${props.value} no es un numero de baños válido!`,
    },
  },
  parking: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: function (image) {
        return /\.(jpg|jpeg|png|svg)$/i.test(image);
      },
      message: (props) => `${props.value} no es un formato de imagen válido!`,
    },
  },
});
HousingSchema.pre("save", function (next) {
  if (!this.code) {
    this.code = CodeGenerator.generateUniqueCode();
  }
  next();
});

module.exports = mongoose.model("housing", HousingSchema);
