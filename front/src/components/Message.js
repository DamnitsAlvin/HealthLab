import React from 'react'

export default function Message(props){
    const {text,says} = props
    return(
        <div className={`messages__item messages__item--${says}`}>
            {text}
        </div>
    )
}