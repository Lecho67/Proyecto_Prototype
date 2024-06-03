const {Schema,model} = require('mongoose');

const FuncionSchema = Schema({
    idPelicula: {
        type: Number,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    dia: {
        type: Number,
        required: true
    },
    mes: {
        type: Number,
        required: true
    },
    año: {  
        type: Number,
        required: true},
        
    dimension: {
        type: String,
        required: true
    },
    doblaje: {
        type: String,
        required: true
    },
    sillas: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Silla'
        }]
});

module.exports = model('Funcion', FuncionSchema);
// objetosFuncionEnElFrontEnd = {hora: "22:00", dia: 23, mes: 5, año: 2024, id: 123468, dimension: "2d", doblaje: "Dob"}