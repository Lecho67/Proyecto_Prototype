const express = require('express');
const producto = require('../models/producto.js');
const Funcion = require('../models/Funcion.js');
const Silla = require('../models/Silla.js');
const app = express();

// crea una funcion en la base de datos, con todas las sillas que va a tener esta función
const crearFuncion = async (req, res) => {
    const { hora, dia, mes, año, dimension, doblaje, sillas } = req.body;
    try {
        const nuevaFuncion = new Funcion({ hora, dia, mes, año, dimension, doblaje });
        // guarda todas las sillas de esta funcion en la base de datos
        const sillasCreadas = await Promise.all(sillas.map(async (silla) => {
            const nuevaSilla = new Silla({ ...silla, funcion: nuevaFuncion._id });
            await nuevaSilla.save();
            return nuevaSilla._id;
        }));

        // agrega el arreglo de las sillas a la nueva funcion
        nuevaFuncion.sillas = sillasCreadas;
        // guarda la funcion en la base de datos
        await nuevaFuncion.save();

        res.status(201).json(nuevaFuncion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const crearOrden = async (req, res) => {
    const { usuarioId } = req.body;
    try {
        const usuario = await Usuario.findById(usuarioId);
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

const reservarSilla = (req, res) => {
    console.log("silla reservada con exito")
}
const cancelarReservaDeSilla = (req, res) => {
    console.log("silla cancelada con exito")
}
const crearUsuario = (req, res) => {
    console.log("usuario creado con exito")
}
// crear un producto en la base de datos
const crearProducto = (req, res) => {
    const crearProducto = new producto(req.body);
    crearProducto.save().then(() => res.json(req.body)).catch(err => console.log(err))
}

// listar los productos de la base de datos
const listarProductos = async (req, res) => {
    const productos = await producto.find();
    res.json(productos);
}


module.exports = { crearFuncion, reservarSilla, cancelarReservaDeSilla, crearUsuario,crearProducto,listarProductos }