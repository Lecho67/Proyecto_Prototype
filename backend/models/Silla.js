const {Schema, model} = require('mongoose');

const reservaSillaSchema = Schema({
    orden:{
        type: Schema.Types.ObjectId,
        ref: 'Orden'},
    funcion: {
        type: Schema.Types.ObjectId,
        ref: 'Funcion'
    },
    estado:{
        type: Boolean,
        require: true
    },
    precio: {
        type: Number,
        require: true
    }
    
});


module.exports = model('Silla',reservaSillaSchema)