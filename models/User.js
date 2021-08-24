const {model, Schema} = require('mongoose')

const schema_u = new Schema({
    name:{type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    kafedr: {type: String, required: true},
    group: {type: String, required: true},
    role: {type: Number, required: true, default: 0},
    isLiked: []
})

module.exports = model('User', schema_u);