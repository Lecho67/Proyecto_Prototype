const express = require('express');
const app = express();
const cors = require('cors');
const {dbConnection} = require('./database/config');
require('dotenv').config();
const routes = require('./routes/Routes.js');
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
dbConnection();
app.use(express.static('public'));
app.use('/api', routes);

app.listen(process.env.PORT, () => console.log("la aplicacion esta corriendo en el puerto", process.env.PORT))