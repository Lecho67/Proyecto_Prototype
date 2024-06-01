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

const crearFunciones = async (req, res) => {
    const funciones = req.body;
    try {
        const funcionesCreadas = await Promise.all(funciones.map(async (funcionData) => {
            const { idPelicula, hora, dia, mes, año, dimension, doblaje, sillas } = funcionData;
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

            return nuevaFuncion;
        }));

        res.status(201).json(funcionesCreadas);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


// obtiene todas las funciones de la base de datos con la id de una pelicula

const obtenerFunciones = async (req, res) => {
    const { idPelicula } = req.params;
    try {
        const funciones = await Funcion.find({ idPelicula: idPelicula });
        res.status(200).json(funciones);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// endpoint para obtener las funciones por su id

const obtenerFuncionPorId = async (req, res) => {
    const { idFuncion } = req.params;
    try {
        const funcion = await Funcion.findById(idFuncion);
        res.status(200).json(funcion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const obtenerSillaPorId = async (req, res) => {
    const { idSilla } = req.params;
    try {
        const silla = await Silla.findById(idSilla);
        res.status(200).json(silla);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
module.exports = { crearFuncion,crearFunciones,obtenerFunciones,obtenerFuncionPorId,obtenerSillaPorId }