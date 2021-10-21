const {model, Schema} = require('mongoose')

const schema_u = new Schema({
    name:{type: String, required: true, unique: true},
    code: {type: String, required: true, unique: true},
    form_of_study: {type: String, required: true},
    PP: {type: Number, required: true},
    GP: {type: Number, required: true},
    SP: {type: Number, required: true},
    COST: {type: Number, required: true},
    program: {type: String, required: true},
    exam: {type: String, required: true},
    place:{type: String, required: true}
})

module.exports = model('Direction', schema_u);