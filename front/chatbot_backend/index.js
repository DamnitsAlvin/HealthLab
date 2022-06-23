const express = require("express")
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require("./config/keys")

require("./models/Demand")
require("./models/Registration")

mongoose.connect(config.mongoURI, {useNewUrlParser: true})

const app = express()
app.use(cors())
app.use(bodyParser.json())

require("./routes/DialogFlowRoutes.js")(app); 

const port = process.env.PORT || 4000


app.listen(port)
