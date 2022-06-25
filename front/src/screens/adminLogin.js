import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import PinInputGrid from '../components/PinInputGrid';

const PARENTAL_PIN_LENGTH = 4; 

export default function AdminLogin(){
    const navigate = useNavigate()
    const [pin, setPin] = useState(new Array(PARENTAL_PIN_LENGTH))
    const [wrongPass, setwrongPass] = useState(false)
    const [retry, setRetry] = useState(localStorage.getItem("retry") ?localStorage.getItem("retry"): 0 )
    const password = [5,7,2,6]
   

    const onPinChanged = (number, index) =>{
        const values = [...pin]
        values[index] = number
        setPin(values)

        console.log("Index:", index)
        if(index==3){
            if(checkIfPinIsCorrect(values, index)){
                const toSet = {
                    data:[
                        "admin", 
                        "admin",
                        "admin"
                    ]
                }
                localStorage.setItem("userInfo", JSON.stringify(toSet))
                navigate("/admin/verifyusers")
            }
        }
        
    }

    const checkIfPinIsCorrect =(val, index) =>{
        console.log("Triggered Checking")
        var pinCorrect = true
        for(var i=0; i<4; i++){
            console.log("pin:",val[i], "password:", password[i])
            if(val[i] != password[i]){
                pinCorrect = false
            }
        }
      
        return pinCorrect
    }
  
    return(
        <div className="centerContainer">
            <PinInputGrid onPinChanged={onPinChanged} pin={pin} pin_input={PARENTAL_PIN_LENGTH} wrong={wrongPass}>

            </PinInputGrid>
        </div>

    )
}