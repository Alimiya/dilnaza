const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    file: {type: Array, required: true, min: 1, max: 8},
    category: {type: String},
    subcategory: {type: String},
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product