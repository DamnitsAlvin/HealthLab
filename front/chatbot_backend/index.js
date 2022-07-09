const express = require("express")
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require("./config/keys")
const uuid = require('uuid/v4')
const stripe = require("stripe")("sk_test_51LJXn1DZAykMgcIKNhhg4kf0Vzq43GEDX8OZiZ8zTHgpFBGcaM3FZ6MsAWPPsZNZQwuL3SkV4TfMnXEB65Sg6dZq00kTNPpJwz")


require("./models/Demand")
require("./models/Registration")

mongoose.connect(config.mongoURI, {useNewUrlParser: true})

const app = express()
app.use(cors())
app.use(bodyParser.json())

require("./routes/DialogFlowRoutes.js")(app); 
app.post(
    "/checkout", 
    async(req,res)=>{
        let error, status; 
        try{
            const {product, token} = req.body
            const customer = await stripe.customers.create({
                email: token.email, 
                source: token.id
            });

            const idempotency_key = uuid()
            const charge = await stripe.charges.create({
                amount: product.price * 100, 
                currency: 'php',
                customer: customer.id, 
                receipt_email: token.email, 
                description: `In payment for ${product.name}`, 
                shipping:{
                    name: token.card.name, 
                    address:{
                        line1: token.card.address_line1, 
                        line2: token.card.address_line2, 
                        city: token.card.address_city, 
                        country: token.card.address_country, 
                        postal_code: token.card.address_zip
                    }
                }
            }, 
            {
                idempotency_key
            }
            )

            console.log("Charge: ", {charge})
            status = "success"
            res.json({error, status, charge})
        }catch(error){
            console.error("Error: ", error)
            status= "failure"
            res.json({error, status})
        }      
    }
)
app.post("/refund", async(req, res)=>{
    let status, error; 
    try{
        const refund = await stripe.refunds.create({
            charge: req.body.charge
        })
        console.log("Refunds status:", refund)
        status = "success"
    }catch(error){
        console.error("ERROR: ", error)
        status = "failure"
    }
    
    res.json({error, status})
})


const port = process.env.PORT || 4000


app.listen(port)
