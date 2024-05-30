const Producto = require('../models/producto.js');


const crearOrden = async (req, res) => {
  try {
    const nuevaOrden = new Order(req.body);
    await nuevaOrden.save();
    res.status(201).json(nuevaOrden);
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ message: 'Error creating order', error: err });
  }
};
// Create a new product
const crearProducto = async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).json({ message: 'Error creating product', error: err });
    }
};

// List all products from the database
const listarProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.status(200).json(productos);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Error fetching products', error: err });
    }
};

module.exports = { crearProducto, listarProductos,crearOrden };
