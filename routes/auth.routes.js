const Router = require('express')
const User = require('../models/User')
const router = new Router()
const bcrypt = require('bcryptjs')
const {check, validateResult} = require('express-validator')

router.post('/registration',
 //   [
 //       check('email', "Uncorrect email").isEmail(),
//        check('password', "Password longer uncorrect").isLength({min: 3, max: 12}),
//   ],
    async (req, res) => {
    console.log(req.body)
        try {
  //          const errors = validateResult(req)
//            if(!errors.isEmpty()){
  //              res.status(400).json({message: "Не корректные данные", errors})
  //          }
            const {email, password} = req.body
            const candidate = await User.findOne({email})
            if (candidate) {
                res.status(400).json({message: "Такой пользователь уже существует"})
            }
            const hashPassword = await bcrypt.hash(password, 13)
            const user = new User({email, password: hashPassword})
            await user.save()
            return res.json({message: "User was created"})
        } catch (e) {
            console.log(e)
            res.send({message: "server error"})
        }
    })

module.exports = router