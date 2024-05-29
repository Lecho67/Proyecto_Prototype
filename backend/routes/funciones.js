const express = require('express');
const router = express.Router();
const { crearFuncion, reservarSilla, cancelarReservaDeSilla,crearProducto,listarProductos  } = require('../controllers/funciones')
const { crearOrden } = require('../controllers/ordenController')
const {crearUsuario} = require('../controllers/usuarioController')

// endpoint para crear una funcion con todas sus sillas asociadas.
router.post('/crearFuncion', crearFuncion);
router.post('/reservarSilla', reservarSilla);
router.post('/cancelarReservaDeSilla', cancelarReservaDeSilla);
// endpoint para crear un usuario con su email y contraseña
router.post('/crearUsuario', crearUsuario);
// endpoint para crear un producto en la base de datos
router.post('/crearProducto', crearProducto);
router.get('/listarProductos', listarProductos);
module.exports = router;