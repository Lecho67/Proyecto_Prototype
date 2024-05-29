const express = require('express');
const router = express.Router();
const { crearFuncion,crearProducto,listarProductos  } = require('../controllers/funciones')
const { crearOrden, agregarSillaAOrden, agregarProductoAOrden } = require('../controllers/ordenController')
const {crearUsuario} = require('../controllers/usuarioController')

// endpoint para crear una funcion con todas sus sillas asociadas.
router.post('/crearFuncion', crearFuncion);
// endpoint para crear un usuario con su email y contraseña
router.post('/crearUsuario', crearUsuario);
// endpoint para crear un producto en la base de datos
router.post('/crearProducto', crearProducto);
// endpoint para traer un arreglo con todos los productos de la base de datos.
router.get('/listarProductos', listarProductos);

//endpoint para crear una orden, mediante el email del usuario.
router.post('/crearOrden', crearOrden);

// endpoint para agregar una silla a una orden
router.put('/agregarSillaAOrden', agregarSillaAOrden);
// endpoint para agregar un producto a una orden
router.put('/agregarProductoAOrden', agregarProductoAOrden);


module.exports = router;