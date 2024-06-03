const Orden = require('../models/orden.js');
const Usuario = require('../models/Usuario.js');
const Silla = require('../models/Silla.js');
const Producto = require('../models/producto.js');
const Funcion = require('../models/Funcion.js');

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

const actualizarEstadoSilla = async (req, res) => {
    const { sillaIds } = req.body;
    try {
        const sillasActualizadas = await Silla.updateMany(
            { _id: { $in: sillaIds } },
            { $set: { estado: true } }
        );
        res.status(200).json(sillasActualizadas);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


const mostrarInformacionDeSillasReservadas = async (req, res) => {
    const { email } = req.params;
    try {
        const usuario = await Usuario.findOne({ email });
        const orden = await Orden.findById(usuario.orden).populate({path:'sillas',populate:{path:'funcion',select:"-sillas"}});
        res.status(200).json(orden);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const quitarSillasDeOrden = async (req, res) => {
    const { email, sillasId } = req.body;
    try {
        const usuario = await Usuario.findOne({ email });
        const orden = await Orden.findById(usuario.orden);
        orden.sillas = orden.sillas.filter((id) => !sillasId.includes(id.toString()));
        const sillas = await Silla.updateMany({ _id: { $in: sillasId } }, { $set: { estado: false } });
        await orden.save();
        res.status(200).json({ message: 'Sillas eliminadas de la orden' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}




module.exports = {agregarProductoAOrden,agregarSillaAOrden, obtenerOrdenDeUsuario,limpiarProductosDeOrden,quitarProductoPorId,mostrarInformacionDeSillasReservadas,actualizarEstadoSilla,quitarSillasDeOrden};
