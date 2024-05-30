const {Schema,model} = require('mongoose');

const ordenSchema = Schema({
    usuario: {
        type:Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    sillas: [{
        type:Schema.Types.ObjectId,
        ref: 'Sillas'
    }],
    productos: [
        {
            type:Schema.Types.ObjectId,
            ref: 'Producto'
        }
    ]

})

module.exports = model('Orden', ordenSchema)