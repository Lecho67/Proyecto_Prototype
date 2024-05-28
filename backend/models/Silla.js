const {Schema, model} = require('mongoose');

const reservaSillaSchema = Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'},
    funcion: {
        type: Schema.Types.ObjectId,
        ref: 'Funcion'
    }
    
});


module.exports = model('Silla',reservaSillaSchema)