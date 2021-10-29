const {model, Schema} = require('mongoose')

const schema_u = new Schema({
    name:{type: String,unique: false},
    code: {type: String,unique: false},
    form_of_study: {type: String,},
    PP: {type: Number, },
    GP: {type: Number, },
    SP: {type: Number,},
    COST: {type: Number, },
    exam: {type: String,},
    place:{type: String, },
    program:{type: String, },
    isled:{type: String, },
    ruprose:{type: String, }
})

module.exports = model('Direction', schema_u);