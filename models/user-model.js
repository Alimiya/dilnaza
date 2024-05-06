const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstName: {type: String},
    surName: {type: String},
    lastName: {type: String},
    phoneNumber: {type: Number},
    role: {type: String, default: 'user', enum: ['user', 'admin']},
    photo: {type: String},
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }],
}, {timestamps: true})

const User = mongoose.model('User', UserSchema)

module.exports = User
