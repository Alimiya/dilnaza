const UserModel = require('../models/user-model')
const {generateAdminToken, generateUserToken} = require('../middlewares/jwt')
const bcrypt = require('bcrypt')

class AuthController {
    async register(req, res) {
        const {username, password, firstName, surName, lastName, phoneNumber} = req.body

        try {
            const userExist = await UserModel.findOne({username})
            if (userExist) return res.status(400).json({message: "User already exists"})

            const phoneNumberExist = await UserModel.findOne({phoneNumber})
            if (phoneNumberExist) return res.status(400).json({message: "Phone number already exists"})

            const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10))
            const user = new UserModel({
                username,
                firstName,
                surName,
                lastName,
                phoneNumber,
                password: hashedPassword,
            })
            await user.save()
            res.status(200).json({message: "User successfully registered"})
        } catch (error) {
            res.status(500).json({message: "Internal server error"})
        }
    }

    async login(req, res) {
        const {username, password} = req.body

        try {
            const user = await UserModel.findOne({username})
            if (!user) return res.status(400).json({message: "Incorrect username"})

            const validationPassword = await bcrypt.compare(password, user.password)
            if (!validationPassword) return res.status(400).json({message: "Incorrect password"})

            const token = user.role === 'user' ? generateUserToken(user) : generateAdminToken(user)
            res.cookie(user.role, token, {maxAge: process.env.TOKEN_EXPIRESIN * 500})

            res.status(200).json({message: "User logged in successfully"})
        } catch (err) {
            res.status(500).json({message: "Internal server error"})
        }
    }

    async logout(req, res) {
        try {
            res.clearCookie('user')
            res.clearCookie('admin')
            return res.status(200).json({message: "User logged out successfully"})
        } catch (err) {
            res.status(500).json({message: "Internal server error"})
        }
    }

}

module.exports = new AuthController()