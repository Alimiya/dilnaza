const UserModel = require('../models/user-model')
const HistoryModel = require('../models/history-model')
const fs = require('fs').promises

class UserController {
    async getUserById(req, res) {
        const userId = req.user._id
        const id = req.params.id
        try {
            if (id !== userId) {
                return res.status(403).json({message: 'You are requiring another user'})
            }
            const user = await UserModel.findOne({_id: id}, {__v: 0})
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json({message: "Internal server error"})
        }
    }

    async getHistory(req, res) {
        const userId = req.user._id
        const id = req.params.id
        try {
            if (id !== userId) {
                return res.status(403).json({message: 'You are requiring another user'})
            }
            const user = await HistoryModel.findOne({user: id}, {products: 1}).populate('products', 'title, quantity')
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json({message: "Internal server error"})
        }
    }

    async editProfile(req, res) {
        const userId = req.user._id
        const id = req.params.id
        const {firstName, lastName, surName, phoneNumber, password} = req.body
        try {
            if (id !== userId) {
                return res.status(403).json({message: 'You are requiring another user'})
            }

            const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10))

            const user = await UserModel.findOneAndUpdate({_id: id}, {
                firstName,
                lastName,
                surName,
                phoneNumber,
                password: hashedPassword
            }, {new: true})
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json({message: "Internal server error"})
        }
    }

    async editPhoto(req, res) {
        const userId = req.user._id
        const id = req.params.id
        const photo = req.file
        try {
            if (id !== userId) {
                return res.status(403).json({message: 'You are requiring another user'})
            }
            if(!photo) {
                return res.status(404).json({message: 'No file'})
            }

            const userFolderPath = path.join(__dirname, '../public/uploads/users/', userId)
            await fs.mkdir(userFolderPath, { recursive: true })

            const user = await UserModel.findById(id)
            const previousPhoto = user.photo
            if (previousPhoto) {
                const previousPhotoPath = path.join(userFolderPath, previousPhoto)
                await fs.unlink(previousPhotoPath)
            }

            const newFileName = `${userId}-${Date.now()}${path.extname(photo.originalname)}`

            const newPath = path.join(userFolderPath, newFileName)
            await fs.rename(photo.path, newPath)

            const updatedUser = await UserModel.findByIdAndUpdate(
                {_id: id},
                {photo: newFileName},
                {new: true}
            )
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json({message: "Internal server error"})
        }
    }

    async deletePhoto(req, res) {
        const userId = req.user._id
        const id = req.params.id
        try {
            if (id !== userId) {
                return res.status(403).json({message: 'You are requiring another user'})
            }
            const user = await UserModel.findOneAndUpdate({_id: id}, {photo: null}, {new: true})
            const filePath = user.photo
            await fs.unlink(filePath)
            res.status(200).json(user, {message: 'File successfully deleted'})
        } catch (err) {
            res.status(500).json({message: "Internal server error"})
        }
    }
}

module.exports = new UserController()