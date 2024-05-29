const producto = require('../models/producto.js');

const crearProducto = (req, res) => {
    const crearProducto = new producto(req.body);
    crearProducto.save().then(() => res.json(req.body)).catch(err => console.log(err))
}

// listar los productos de la base de datos
const listarProductos = async (req, res) => {
    const productos = await producto.find();
    res.json(productos);
}

module.exports = { crearProducto, listarProductos }