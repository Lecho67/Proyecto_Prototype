const Usuario = require('../models/Usuario.js');
const Orden = require('../models/orden.js');
const crearUsuario = async (req, res) => {
    const { email, password } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario
    const nuevoUsuario = new Usuario({ email, password });
    const nuevaOrden = new Orden({ usuario: nuevoUsuario._id });
    nuevoUsuario.orden = nuevaOrden._id;

    try {
        await nuevaOrden.save();
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { crearUsuario };
