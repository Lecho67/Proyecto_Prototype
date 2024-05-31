const express = require('express');
const Funcion = require('../models/Funcion.js');
const Silla = require('../models/Silla.js');
const app = express();

// crea una funcion en la base de datos, con todas las sillas que va a tener esta función
const crearFuncion = async (req, res) => {
    const { idPelicula, hora, dia, mes, año, dimension, doblaje, sillas } = req.body;
    try {
        const nuevaFuncion = new Funcion({ idPelicula, hora, dia, mes, año, dimension, doblaje });
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


// crear un producto en la base de datos


module.exports = { crearFuncion}