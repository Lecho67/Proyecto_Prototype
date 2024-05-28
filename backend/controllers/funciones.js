const express = require('express');

const app = express();

const crearFuncion = (req, res) => {
    console.log("funcion creada con exito")
}

const reservarSilla = (req, res) => {
    console.log("silla reservada con exito")
}

const cancelarReservaDeSilla = (req, res) => {
    console.log("silla cancelada con exito")
}

const crearUsuario = (req, res) => {
    console.log("usuario creado con exito")
}

const holaMundo = (req, res) => {
    res.json({
        message: 'hola mundo'})
}

module.exports = { crearFuncion, reservarSilla, cancelarReservaDeSilla, crearUsuario,holaMundo }