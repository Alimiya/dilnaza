const mongoose = require('mongoose')

const SubcategorySchema = new mongoose.Schema({
    name: {type: String, required: true}
})

const Subcategory = mongoose.model('Subcategory', SubcategorySchema)

module.exports = Subcategory