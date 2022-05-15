import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Testing(){
    const [position, setPosition] = useState({})
    function getLocation(){
        if ("geolocation" in navigator) {
           navigator.geolocation.getCurrentPosition(function(position){
               console.log("lat:",  position.coords.latitude)
               console.log("longitude: ", position.coords.longitude)
               setPosition({latitude: position.coords.latitude, 
                            longitude: position.coords.longitude})
           });
        } else { 
           setPosition({error: "No geolocation function"})
        }
    }


    const {id} = useParams()
    useEffect(()=>{
        if(id){
            console.log(`The ID is : ${id}`)
        }
        getLocation()
    }, [id])
    return(
        <div className='centerContainer'>{position.error ? position.error : position.latitude + " " + position.longitude}</div>
        
        ); 
}