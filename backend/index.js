const express = require('express');
const app = express();
const cors = require('cors');
const {dbConnection} = require('./database/config');

require('dotenv').config();
const headers = {
    cors:{
        origin: "https://cinepluscp.netlify.app/",
        optionsSuccessStatus: 200,
        allowedHeaders: 'Content-Type,Authorization',
        methods: 'GET,POST,PUT,DELETE'
    }
}

const routes = require('./routes/Routes.js');
app.use(cors(headers));
app.use(express.json({ limit: '250mb' }));

dbConnection();
app.use(express.static('public'));
app.use('/api', routes);

app.listen(process.env.PORT, () => console.log("la aplicacion esta corriendo en el puerto", process.env.PORT))