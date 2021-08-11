const {Schema, model, ObjectId} = require('mongoose')

const Car = new Schema({
    brand: {type: String, required: true},
    model: {type: String, required: true},
    yearManufacture: {type: Number, required: true},
    stateNumber: {type: String, required: true},
    vin: {type: String, required: true},
    category: {type: Number, required: true},
    user: {type: ObjectId, ref: 'User'}
})

module.exports = model('Car', Car)