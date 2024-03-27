//preguntar al profesor si es mejor usar un put o un post para agregar en bd y cual es la diferencia
//el codigo sea de cuatro letras y cuatro numeros y lo genere automaticamente

const express = require("express");
const router = express.Router();
const HousingSchema = require("../models/Housing");
const multer = require("multer");
const CodeGenerator = require("../controllers/CodeGenerator");

router.get("/housing", async (req, res) => {
  //Traer todas las casas
  await HousingSchema.find()
    .then((housing) => {
      res.json(housing);
    })
    .catch((err) => {
      res.status(500).send({ status: "error", message: err.message });
    });
});

router.get("/housing/:code", async (req, res) => {
  //Traer una casa especifica pasando el code
  var code = req.params.code;

  await HousingSchema.findOne({ code: code })
    .then((housing) => {
      res.json(housing);
    })
    .catch((err) => {
      res.status(500).send({ status: "error", message: err.message });
    });
});

router.post("/housing", async (req, res) => {
  const existingHousing = await HousingSchema.findOne({
    code: CodeGenerator.generateUniqueCode(),
  });
  if (existingHousing) {
    return res
      .status(400)
      .send({
        err:
          "El código de vivienda ya existe. Intente nuevamente." + err.message,
      });
  }
  //Crear una vivienda
  try {
    let housing = HousingSchema({
      code: CodeGenerator.generateUniqueCode(),
      type: req.body.type,
      state: req.body.state,
      city: req.body.city,
      address: req.body.address,
      zip_code: req.body.zip_code,
      price: req.body.price,
      size: req.body.size,
      rooms: req.body.rooms,
      bathrooms: req.body.bathrooms,
      parking: req.body.parking,
    });
    await housing.save();
    res.status(201).send(housing);
  } catch (err) {
    res.status(500).send({ err: "Error al crear vivienda: " + err.message });
  }
});

router.patch("/housing/:code", (req, res) => {
  var code = req.params.code;

  let updateHousing = {
    type: req.body.type,
    state: req.body.state,
    city: req.body.city,
    address: req.body.address,
    zip_code: req.body.zip_code,
    price: req.body.price,
    size: req.body.size,
    rooms: req.body.rooms,
    bathrooms: req.body.bathrooms,
    parking: req.body.parking,
    image: req.body.image,
  };
  HousingSchema.findOneAndUpdate({ code: code }, updateHousing, { new: true })
    .then((result) => {
      res
        .status(200)
        .send({
          result,
          status: "success",
          message: "Vivienda actualizada con éxito",
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error actualizando el registro: " + err.message);
    });
});

router.delete("/housing/:code", (req, res) => {
  var code = req.params.code;

  HousingSchema.deleteOne({ code: code })
    .then(() => {
      res
        .status(200)
        .json({
          status: "success",
          message: "Vivienda eliminada correctamente",
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          status: "failed",
          message: "Error eliminando vivienda" + err.message,
        });
    });
});

//configuracion de libreria multer

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/housing");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("El archivo no es una imagen"));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
//Servicio web para el almacenamiento de archivos
router.post("/upload/:code/housing", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .send({ status: "error", message: "No se proporciono ningun archivo" });
  }

  var code = req.params.code;

  var updateHousing = {
    avatar: req.file.path,
  };

  HousingSchema.findOneAndUpdate({ code: code }, updateHousing, { new: true })
    .then((result) => {
      res
        .status(200)
        .send({
          status: "success",
          message: "Archivo subido correctamente" + result,
        });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .send({ status: "error", message: "Error actualizando el registro" });
    });
});

module.exports = router;
