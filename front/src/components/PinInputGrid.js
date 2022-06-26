import React, {useEffect, useRef} from 'react'

export default function PinInputGrid(props){
    const {onPinChanged, pin, pin_input, wrong} = props
    const tref = useRef([])
    console.log("Ref:", tref)



    const changePinFocus = (pinIndex)=>{
        const ref = tref.current[pinIndex]
        if(ref){
            ref.focus()
        }
    }
    const onChangeHandler = (e, index) =>{
        const value = e.target.value
        const pinNumber = parseInt(e.target.value.trim())
        if(isNaN(pinNumber) || value.length ===  0 ){
            return
        }
        console.log(pinNumber)
        if(pinNumber >= 0 && pinNumber <= 9){
            onPinChanged(pinNumber, index)
            if(index < pin_input-1){
                changePinFocus(index+1)
            }
        }
    }

    const onKeyDownHandler = (e, i) =>{
        console.log("index: ", i)
        var key = e.nativeEvent.code
        if(key !== "Backspace"){
            return
        }
        if(pin[i] === undefined){
            changePinFocus(i-1)
        }
        else{
            onPinChanged(undefined, i)
        }
    }

    const onClickHandler = (index) =>{
        var counter = index
        for(let i=index; i>0; i--){
            if(pin[counter-1]===undefined){
                counter--
                changePinFocus(i-1)
            }
            else{
                return
            }
        }
        console.log("CLICKKKKKKKED")
    }

    return(
        <div className="pin">
            PIN CODE
        <div className="pin-code">
           
            {
                Array.from({length: pin_input},( _, index) =>(
                    <input ref={(el)=>{
                        if(el){
                            tref.current[index] = el
                        }
                        
                    }} key={index} 
                    onChange={(e) => onChangeHandler(e, index)} 
                    onKeyDown={(e)=>onKeyDownHandler(e,index)}
                    onClick={()=>{onClickHandler(index)}}
                    value={pin[index]} 
                    type="number"
                    />
                 ) )
            }

            
        </div>
        </div>
    )
}