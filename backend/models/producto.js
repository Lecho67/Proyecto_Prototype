const {Schema,model} = require('mongoose');

const productoSchema = Schema({
    img:{
        type:String,
        require: true
    },
    name:{
        type:String,
        require: true
    },
    precio:{
        type:String,
        require: true
    }
})

module.exports = model('Producto',productoSchema)