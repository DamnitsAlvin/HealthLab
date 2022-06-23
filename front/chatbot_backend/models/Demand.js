const mongoose = require("mongoose")

const demandSchema = new mongoose.Schema({
    course: String, 
    counter: {type: Number, default: 1}
})

mongoose.model('Demand', demandSchema)