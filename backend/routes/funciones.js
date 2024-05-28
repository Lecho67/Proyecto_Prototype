const express = require('express');
const router = express.Router();
const { crearFuncion, reservarSilla, cancelarReservaDeSilla, crearUsuario,holaMundo } = require('../controllers/funciones')

router.post('/crearFuncion', crearFuncion);
router.post('/reservarSilla', reservarSilla);
router.post('/cancelarReservaDeSilla', cancelarReservaDeSilla);
router.post('/crearUsuario', crearUsuario);
router.get('/holaMundo', holaMundo);
module.exports = router;