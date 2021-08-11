const Router = require('express')
const Car = require('../models/Car')
const authMiddleware = require('../middleware/auth.middleware')
const carController = require('../controllers/carController')

const router = new Router()
router.post('', authMiddleware, carController.createCar)
router.get('', authMiddleware, carController.getCars)

module.exports = router

