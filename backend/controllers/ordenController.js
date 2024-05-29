const Orden = require('../models/orden.js');
const Usuario = require('../models/Usuario.js');
const Silla = require('../models/Silla.js');
const Producto = require('../models/producto.js');
const crearOrden = async (req, res) => {
    const { email } = req.body;
    try {
        const usuario = await Usuario.findOne({email: email});
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        const nuevaOrden = new Orden({ usuario: usuario._id });
        await nuevaOrden.save();
        usuario.orden = nuevaOrden._id;
        await usuario.save();
        res.status(201).json(nuevaOrden);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const agregarSillaAOrden = async (req, res) => {
    const { ordenId, sillaId } = req.body;
    try {
        const orden = await Orden.findById(ordenId);
        const silla = await Silla.findById(sillaId);

        if (!orden || !silla) {
            return res.status(404).json({ message: 'Orden o Silla no encontrada' });
        }

        orden.sillas.push(silla._id);
        await orden.save();

        res.status(200).json(orden);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const agregarProductoAOrden = async (req, res) => {
    const { ordenId, productoId } = req.body;
    try {
        const orden = await Orden.findById(ordenId);
        const producto = await Producto.findById(productoId);

        if (!orden || !producto) {
            return res.status(404).json({ message: 'Orden o Producto no encontrado' });
        }

        orden.productos.push(producto._id);
        await orden.save();

        res.status(200).json(orden);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};




module.exports = { crearOrden,agregarProductoAOrden,agregarSillaAOrden }