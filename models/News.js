const {model, Schema} = require('mongoose')

const schema_u = new Schema({
    header:{type: String, required: true, unique: true},
    text: {type: String, required: true},
    date: {type: String, required: true},
    img: {type: String, required: true},
    likes: {type: Number, required: true, default: 0},
    views: {type: Number, required: true, default: 0}
})

module.exports = model('New', schema_u);