import React, {useState} from "react";

export default function Accordion(props){
    const [active, setActive] = useState(props.active ? props.active: false)
    const [currentClass, setcurrentClass] = useState("close")
    
    return(
        <>
        <div className='accordion' onClick={()=>setActive(!active)}>{props.title}</div>
        {active && 
        (
            <div className="accordion-item">
                <p>{props.children}</p>
            </div> 
        )}
        
        </>
    );
}