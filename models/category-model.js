const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: {type: String, required: true},
    subcategories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subcategory'
        }
    ]
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category