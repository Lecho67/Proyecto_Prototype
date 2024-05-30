const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        mongoose.connect(process.env.DB_CONNECTION, {
            autoIndex: true
        });

        console.log('Base de datos conectada');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos');
    }
}

module.exports = {dbConnection};

