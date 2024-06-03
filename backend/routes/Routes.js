const express = require('express');
const router = express.Router();
const { crearFuncion,crearFunciones, obtenerFunciones, obtenerFuncionPorId, obtenerSillaPorId } = require('../controllers/funcionesController.js')

const { agregarSillaAOrden, agregarProductoAOrden, obtenerOrdenDeUsuario,limpiarProductosDeOrden,quitarProductoPorId,mostrarInformacionDeSillasReservadas,actualizarEstadoSilla,quitarSillasDeOrden} = require('../controllers/ordenController.js')

const {crearUsuario, crearUsuarioGoogle} = require('../controllers/usuarioController.js')

const {crearProducto,listarProductos,obtenerProductoPorId} = require("../controllers/productoController.js")
// endpoint para crear una funcion con todas sus sillas asociadas.
router.post('/crearFuncion', crearFuncion);

router.post('/crearFunciones', crearFunciones);
// endpoint para crear un usuario con su email y contraseña
router.post('/crearUsuario', crearUsuario);


// Endpoint to create a product in the database.

// endpoint para crear un usuario con google
router.post('/crearUsuarioGoogle', crearUsuarioGoogle);
// endpoint para crear un producto en la base de datos

router.post('/crearProducto', crearProducto);

// Endpoint to fetch an array of all products from the database.
router.get('/listarProductos', listarProductos);

// Endpoint to add a seat to an order.
router.put('/agregarSillaAOrden', agregarSillaAOrden);

// Endpoint to add a product to an order.
router.put('/agregarProductoAOrden', agregarProductoAOrden);

// Endpoint to get the order of a specific user by email.
router.get('/obtenerOrdenDeUsuario/:email', obtenerOrdenDeUsuario);

// Endpoint to get the functions of a movie by its ID.
router.get('/obtenerFunciones/:idPelicula', obtenerFunciones);

// Endpoint to get the details of a function by its ID.
router.get('/obtenerFuncionPorId/:idFuncion', obtenerFuncionPorId);

// Endpoint to get the details of a seat by its ID.
router.get('/obtenerSillaPorId/:idSilla', obtenerSillaPorId);

router.put('/actualizarEstadoSilla', actualizarEstadoSilla);
// endpoint para limpiar los productos de una orden
router.put('/limpiarProductosDeOrden', limpiarProductosDeOrden);
// endpoint para quitar un producto de una orden por su id
router.put('/quitarProductosPorId',quitarProductoPorId);
// endpoint para obtener un producto por su id
router.get('/productos/:id', obtenerProductoPorId);
// endpoint para mostrar la informacion de las sillas reservadas por un usuario
router.get('/informacionSillasReservadas/:email', mostrarInformacionDeSillasReservadas);

//enpoint para quitar sillas de una orden
router.put('/quitarSillasDeOrden', quitarSillasDeOrden);
module.exports = router;

