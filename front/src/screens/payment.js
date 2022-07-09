import React, { useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

export default function Payment(){
    const [success, setsuccess] = useState()
    const [product] = useState({
        name:"Doctor's fee", 
        price: 500
    })
    async function handleToken(token){
        const response = await axios.post("http://localhost:4000/checkout", {token, product})
        console.log({token})

        const {status} = response.data
        const {charge} = response.data
        console.log(charge)
        if (status === 'success'){
            setsuccess(true)
        }else{
            setsuccess(false)
        }
         
    }
    return(
        <div className = "centerContainer">
        <StripeCheckout
            stripeKey="pk_test_51LJXn1DZAykMgcIKs9TPLiiCKOOGYDYwQaGBQcEKuNk1yZvusyVE5JKDH4TXLLqyAZocqTvNvCMjOZfFaKXaZhec00OsCbsfuV"
            token={handleToken}
            amount={500 * 100}
            name= "Doctor's Payment"
            />
        {success!= undefined && success ? 

        <>
        <div className='alert alert-success'>Payment Success!</div>
        </>
        : <></>}
        </div>
    )
}