const express = require('express');
const app = express();
const {dbConnection} = require('./database/config');
require('dotenv').config();

dbConnection();
app.use(express.static('public'));
app.use('/', require('./routes/funciones'));

app.listen(process.env.PORT, () => console.log("la aplicacion esta corriendo en el puerto", process.env.PORT))