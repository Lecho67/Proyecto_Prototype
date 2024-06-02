const Usuario = require('../models/Usuario.js');
const Orden = require('../models/orden.js');
const bcrypt = require('bcryptjs');

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
    const salt = bcrypt.genSaltSync();
    nuevoUsuario.password = bcrypt.hashSync(password, salt);
    nuevoUsuario.orden = nuevaOrden._id;

    try {
        await nuevaOrden.save();
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const crearUsuarioGoogle = async (req, res) => {
    const { email } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(200).json(usuario); 
        }
        let password = "bff149a0b87f5b0e00d9dd364e9ddaa0"

        const nuevoUsuario = new Usuario({ email, password });
        const nuevaOrden = new Orden({ usuario: nuevoUsuario._id });
        const salt = bcrypt.genSaltSync();
        nuevoUsuario.password = bcrypt.hashSync(password, salt);
        nuevoUsuario.orden = nuevaOrden._id;

        await nuevaOrden.save();
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { crearUsuario, crearUsuarioGoogle };
