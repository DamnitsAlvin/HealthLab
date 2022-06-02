import  Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function Testing(){
    const [position, setPosition] = useState({})
    const [selectedFile, setSelectedFile] = useState()
    const [isFileSelected, isSelectedFile] = useState(false)
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


    const changeHandler = (event) =>{
        setSelectedFile(event.target.files[0])
        isSelectedFile(true)
    }

    const submitHandler = async(event) =>{
        event.preventDefault()
        const formData = new FormData();
		formData.append('file', selectedFile);
        const {data} = await Axios.post("http://localhost:5000/api/test", formData)
        console.log(data.message)

    }


    return(
        <>
            <div className='centerContainer'>{position.error ? position.error : position.latitude + " " + position.longitude}
            <form encType="multipart/form-data" onSubmit={submitHandler}>
                <input type="file" name="file" onChange={changeHandler}/>
                <input type="submit"/>
            </form>
            
            </div>
            
        
  
        </>
        ); 
}