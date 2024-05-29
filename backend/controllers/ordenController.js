const Orden = require('../models/orden.js');
const Usuario = require('../models/Usuario.js');
const crearOrden = async (req, res) => {
    const { email } = req.body;
    try {
        const usuario = await Usuario.find({email: email});
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const nuevaOrden = new Orden({ usuario: usuario._id });
        await nuevaOrden.save();

        res.status(201).json(nuevaOrden);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};