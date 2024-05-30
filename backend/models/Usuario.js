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
    orden: 
        {
            type: Schema.Types.ObjectId,
            ref: 'Orden'
        }
});

module.exports = model('Usuario',UsuarioSchema);
