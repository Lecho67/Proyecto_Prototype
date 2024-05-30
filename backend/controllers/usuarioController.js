const Usuario = require('../models/Usuario.js');

const crearUsuario = async (req, res) => {
    const { email, password } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario
    const nuevoUsuario = new Usuario({ email, password });

    try {
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { crearUsuario };
