const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    sillasReservadas: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Silla'
        }]
});

module.exports = model('Usuario',UsuarioSchema);
