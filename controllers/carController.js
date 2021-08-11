const Car = require('../models/Car')

class CarController {
    async createCar(req, res) {
        try {
            const {brand, model, yearManufacture, stateNumber, vin, category} = req.body
            const car = new Car({
                brand, model, yearManufacture, stateNumber,
                vin, category, user: req.user.id
            })
            await car.save()
            return res.json(car)
        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }
    async getCars(req, res) {
        try {
            const cars = await Car.find({user: req.user.id})
            return res.json(cars)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: " Car not found"})
        }
    }
}

module.exports = new CarController()