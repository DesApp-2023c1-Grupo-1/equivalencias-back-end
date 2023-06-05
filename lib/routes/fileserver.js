const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const MIMETYPES = ['application/pdf'];
const router = express.Router();
const directorio = '../../../fileserver/archivos';

const diskstorage = multer.diskStorage({
  destination: path.join(__dirname, directorio),
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const fileName = file.originalname.split(fileExtension)[0];
    cb(null, `${fileName}-${Date.now()}${fileExtension}`);
  },
});

const fileUpload = multer({
  storage: diskstorage,
  fileFilter: (req, file, cb) => {
    if (MIMETYPES.includes(file.mimetype)) cb(null, true);
    else cb(new Error(`Solo se permiten archivos ${MIMETYPES.join('')}`));
  },
  limits: {
    fieldSize: 10000000,
  },
}).single('archivopdf');

router.get('/todos', (req, res) => {
  const archivos = fs.readdirSync(path.join(__dirname, directorio));
  res.json(archivos);
});

router.get('/:id', (req, res) => {
  const archivos = fs.readdirSync(path.join(__dirname, directorio));
  const archivo = archivos.find(
    (nombreArchivo) => req.params.id === nombreArchivo
  );
  res.json(archivo);
});

router.post('/', fileUpload, (req, res) => {
  console.log('Datos del archivo guardado');
  console.log(req.file);
  res.send(
    //Nombre del archivo
    req.file.path.substring(
      req.file.path.lastIndexOf('\\') + 1,
      req.file.path.length
    )
  );
});

router.delete('/:id', (req, res) => {
  fs.unlinkSync(path.join(__dirname, directorio + '/' + req.params.id));
  console.log('Se borró el archivo' + req.params.id);
  res.send(req.params.id);
});

export default router;
