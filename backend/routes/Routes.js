const express = require('express');
const router = express.Router();
const { crearFuncion, obtenerFunciones } = require('../controllers/funcionesController.js')
const { agregarSillaAOrden, agregarProductoAOrden, obtenerOrdenDeUsuario} = require('../controllers/ordenController.js')
const {crearUsuario} = require('../controllers/usuarioController.js')
const {crearProducto,listarProductos} = require("../controllers/productoController.js")
// endpoint para crear una funcion con todas sus sillas asociadas.
router.post('/crearFuncion', crearFuncion);
// endpoint para crear un usuario con su email y contraseña
router.post('/crearUsuario', crearUsuario);
// endpoint para crear un producto en la base de datos
router.post('/crearProducto', crearProducto);
// endpoint para traer un arreglo con todos los productos de la base de datos.
router.get('/listarProductos', listarProductos);
//endpoint para crear una orden, mediante el email del usuario.
// endpoint para agregar una silla a una orden
router.put('/agregarSillaAOrden', agregarSillaAOrden);
// endpoint para agregar un producto a una orden
router.put('/agregarProductoAOrden', agregarProductoAOrden);
// endpoint para obtener la orden de un usuario especifico
router.get('/obtenerOrdenDeUsuario/:email', obtenerOrdenDeUsuario);
// endpoint para obtener las funciones de una pelicula por la id de la pelicula
router.get('/obtenerFunciones/:idPelicula', obtenerFunciones);

module.exports = router;