const mongoose = require("mongoose"); // Importando la libreria

// Creando el modelo de housing
const HousingSchema = new mongoose.Schema({
  code: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
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
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
});
HousingSchema.pre("save", function (next) {
  if (!this.code) {
    this.code = CodeGenerator.generateUniqueCode();
  }
  next();
});

module.exports = mongoose.model("housing", HousingSchema);
