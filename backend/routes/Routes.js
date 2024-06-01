const express = require('express');
const router = express.Router();

const {
  crearFuncion,
  obtenerFunciones,
  obtenerFuncionPorId,
  obtenerSillaPorId
} = require('../controllers/funcionesController.js');

const {
  agregarSillaAOrden,
  agregarProductoAOrden,
  obtenerOrdenDeUsuario,
  limpiarProductosDeOrden
} = require('../controllers/ordenController.js');

const { crearUsuario } = require('../controllers/usuarioController.js');
const { crearProducto, listarProductos,obtenerProductoPorId } = require('../controllers/productoController.js');

// Endpoint to create a function with all its associated seats.
router.post('/crearFuncion', crearFuncion);

// Endpoint to create a user with email and password.
router.post('/crearUsuario', crearUsuario);

// Endpoint to create a product in the database.
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

// Endpoint to clear products from an order.
router.put('/limpiarProductosDeOrden', limpiarProductosDeOrden);

router.get('/productos/:id', obtenerProductoPorId);

module.exports = router;
