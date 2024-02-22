/*const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/housing')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image/')){
        cb(null, true)
    }else{
        cb(new Error('El archivo no es una imagen'), false)
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter});

class HousingController {
    // Ahora podemos definir métodos que utilizan Multer para cargar imágenes, por ejemplo:
    static async uploadHousingImage(req, res) {
        // Aquí 'image' es el nombre del campo en el formulario que contiene la imagen
        // La imagen cargada estará disponible en req.file
        try {
            await upload.single('image')(req, res, err => {
                if (err instanceof multer.MulterError) {
                    return res.status(400).json({ error: 'Error al subir la imagen' + err.message });
                } else if (err) {
                    return res.status(400).json({ error: err.message });
                }
                // En este punto, la imagen se ha subido correctamente
                return res.status(200).json({ message: 'Imagen subida correctamente' });
            });
        } catch (err) {
            return res.status(500).json({ error: 'Error interno del servidor' + err.message });
        }
    }
}

module.exports = HousingController;*/