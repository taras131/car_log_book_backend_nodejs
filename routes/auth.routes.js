const Router = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validateResult} = require('express-validator')
const config = require('config')
const authMiddleware = require('../middleware/auth.middleware')

const router = new Router()
router.post('/registration', async (req, res) => {
    console.log(req.body)
    try {
        const {email, password} = req.body
        const candidate = await User.findOne({email})
        if (candidate) {
            res.status(400).json({message: "Такой пользователь уже существует"})
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = new User({email, password: hashPassword})
        await user.save()
        return res.json({message: "User was created"})
    } catch (e) {
        console.log(e)
        res.send({message: "server error"})
    }
})

router.post('/login', async (req, res) => {
    console.log(req.body)
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if (!user) {
            res.status(404).json({message: "User not found"})
        }
        const isPassValid = await bcrypt.compareSync(password, user.password)
        if (!isPassValid) {
            res.status(400).json({message: "Invalid password"})
        }
        const token = await jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: "12h"})
        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email
            }
        })
    } catch (e) {
        console.log(e)
        res.send({message: "server error"})
    }
})

router.post('/auth', authMiddleware, async (req, res) => {
    console.log(req.body)
    try {
        const user = await findOne({id: req.user.id})
        const token = await jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: "12h"})
        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email
            }
        })
    } catch (e) {
        console.log(e)
        res.send({message: "server error"})
    }
})

module.exports = router