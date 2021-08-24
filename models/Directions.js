const {model, Schema} = require('mongoose')

const schema_u = new Schema({
    name:{type: String, required: true, unique: true},
    code: {type: String, required: true, unique: true},
    term: {type: Number, required: true},
    form_of_study: {type: String, required: true},
    GB: {type: Number, required: true},
    CV: {type: Number, required: true},
    text: {type: String, required: true}
})

module.exports = model('Direction', schema_u);