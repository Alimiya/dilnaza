const ProductModel = require('../models/product-model')
const CategoryModel = require('../models/category-model')

class ProductController {
    async getProducts(req, res) {
        try {
            const products = await ProductModel.find({}, {
                title: 1,
                description: 1,
                price: 1,
                category: 1,
                subcategory: 1,
                quantity: 1,
                file: 1,
            })
            res.status(200).json(products)
        } catch (err) {
            res.status(500).json({ message: "Internal server error" })
        }
    }
    async getProductById(req, res) {
        const productId = req.params.id
        try {
            const product = await ProductModel.findById(productId, {
                title: 1,
                description: 1,
                category: 1,
                subcategory: 1,
                price: 1,
                file: 1,
            })
            res.status(200).json(product)
        } catch (err) {
            res.status(500).json({ message: "Internal server error" })
        }
    }
    async getCategories(req,res) {
        try {
            const categories = await CategoryModel.find({}, {
                name: 1
            }).populate('subcategories', 'name')
            res.status(200).json(categories)
        } catch (err) {
            res.status(500).json({ message: "Internal server error" })
        }
    }
    async getCategoryById(req,res) {
        const categoryId = req.params.id
        try {
            const category = await CategoryModel.findById(categoryId, {
                name: 1
            }).populate('subcategories', 'name')
            res.status(200).json(category)
        } catch (err) {
            res.status(500).json({ message: "Internal server error" })
        }
    }
    async getProductsByCategory(req,res) {
        const categoryId = req.query.category
        try {
            const products = await ProductModel.find({ category: categoryId }, {
                title: 1,
                description: 1,
                price: 1,
                category: 1,
                subcategory: 1,
                quantity: 1,
                file: 1,
            })
            res.status(200).json(products)
        } catch (err) {
            res.status(500).json({ message: "Internal server error" })
        }
    }
    async getProductsBySubcategory(req,res) {
        const subcategoryId = req.query.subcategory
        try {
            const products = await ProductModel.find({ subcategory: subcategoryId }, {
                title: 1,
                description: 1,
                price: 1,
                category: 1,
                subcategory: 1,
                quantity: 1,
                file: 1,
            })
            res.status(200).json(products)
        } catch (err) {
            res.status(500).json({ message: "Internal server error" })
        }
    }
}

module.exports = new ProductController()