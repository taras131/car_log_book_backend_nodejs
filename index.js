const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const authRouter = require('./routes/auth.routes')
const cors = require('cors')

//create server
const app = express()
const PORT = config.get('serverPort')
app.use(express.json())
app.use(cors())
app.use('/api/auth', authRouter)
const start = async () => {
    try {
        await mongoose.connect(config.get("dbURL"))
        app.listen(PORT, () => {
            console.log("start server", PORT)
        })
    } catch (e) {

    }
}
start()