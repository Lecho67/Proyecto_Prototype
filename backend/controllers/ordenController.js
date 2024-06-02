const Orden = require('../models/orden.js');
const Usuario = require('../models/Usuario.js');
const Silla = require('../models/Silla.js');
const Producto = require('../models/producto.js');


const obtenerOrdenDeUsuario = async (req, res) => {
    const {email} = req.params;
    try{
        const usuario = await Usuario.findOne({email});
        const traerOrden = await Orden.findById(usuario.orden);
        res.status(200).json(traerOrden);
    }catch(err){
        res.status(400).json({message: err.message});
    }
}

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
        // falta que a la silla se le relacione la orden
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

const limpiarProductosDeOrden = async (req, res) => {
    const { ordenId } = req.body;
    try {
        const orden = await Orden.findById(ordenId);
        orden.productos = [];
        await orden.save();
        res.status(200).json(orden);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const quitarProductoPorId = async (req, res) => {
    const { email, productoId } = req.body;
    try {
        const usuario = await Usuario.findOne({ email });
        const orden = await Orden.findById(usuario.orden);
        orden.productos = orden.productos.filter((id) => id.toString() !== productoId);
        await orden.save();
        res.status(200).json(orden);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}



module.exports = {agregarProductoAOrden,agregarSillaAOrden, obtenerOrdenDeUsuario,limpiarProductosDeOrden,quitarProductoPorId}