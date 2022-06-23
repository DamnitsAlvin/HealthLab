import Accordion from "../components/accordion"
import {UpdateImage} from "../actions/doctorActions"
import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import axios from "axios"
import { useNavigate } from "react-router-dom"


export default function RegisterService(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [serviceInfo, setserviceInfo] = useState({
        "id": "", 
        "name": "", 
        "email":"", 
        "password": "", 
        "image":""
    })

    const [servicePic, setservicePic] = useState()
    const [fileName, setFileName] = useState()
    const [confirmPassword, setconfirmPassword] = useState("")

    const changeTextHandler = (event) =>{
        const values = {...serviceInfo}
        values[event.target.name] = event.target.value
        setserviceInfo(values)
    }
    

    const generateServiceID = () =>{
            var date = new Date(); 
            var time = date.getMinutes() +""+ date.getMilliseconds()  +date.getSeconds();
            var service_id = serviceInfo["name"]  ? serviceInfo["name"].toUpperCase()+time: "";
            const values = {...serviceInfo}
            values["id"] = service_id
            setserviceInfo(values)
            return service_id
    }

    const submitHandler = (event) =>{
        event.preventDefault()
        const id = generateServiceID()
        setserviceInfo((serviceInfo) =>{
            console.log(serviceInfo)
            saveToDatabase(serviceInfo)
            return serviceInfo
        }) 
        if(servicePic){
            const extension = fileName.split(".")[1]
            const filedet = "/uploads/" +id +"Image."+extension

            const formData = new FormData()
            formData.append('id', id)
            formData.append('file', servicePic)
            dispatch(UpdateImage(formData))
            setserviceInfo((serviceInfo)=>{
                return(
                   { ...serviceInfo, 
                    "image": filedet
                }
                )   
            })
        } 
       
    }
    const saveToDatabase = async(info) =>{
        const response = await axios.post("http://localhost:5000/api/registerService", {"Info": Object.values(info)})
        if(response.status==200){
            navigate("/")
        }
        console.log(response)
    }
    
    const fileHandler = (event) =>{
        setservicePic(event.target.files[0])
        setFileName(event.target.files[0].name)
    }

    return(
        <>
         <div className="wow fadeInDown" data-wow-delay="0.1s">
 
            <div className="centerContainer">
                <h2>Register here</h2>
		        <p>Please fill in this form to create an account</p>
                
		        <hr/>
                <Accordion title="Basic Service Information" active={true}>
                        <div className="fa-thin fa-building" className="form-group">
                            <div  className="row" >
                            <div  className="col-xs-12" ><input   type="text" className="form-control" name="name"  placeholder="&#xf015; Establishment Name" onChange={event => changeTextHandler(event)}/></div>
                            </div>        	
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-xs-12"><input type="email" className="form-control" name="email" placeholder="&#xf64f; Email" onChange={event => changeTextHandler(event)}/></div>
                            </div>        	
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-xs-12"><input type="password" className="form-control" name="password" placeholder="&#xf023; Password" onChange={event => changeTextHandler(event)}/></div>
                            </div>        	
                        </div>

                        <div className="form-group">
                            <div className="row">
                                <div className="col-xs-12"><input type="password" className="form-control" name="confirm_password" placeholder="&#xf023; Confirm Password" onChange={(event)=>setconfirmPassword(event.target.value)}/></div>
                            </div>        	
                        </div>
                        {confirmPassword != serviceInfo['password'] && "Password mismatch"}
                        <div className="form-group">
                            <div className="row">
                                <div className="col-xs-12"><input type="file" className="form-control" name="image"  onChange={(event)=>fileHandler(event)}/></div>
                            </div>        	
                        </div>   
                </Accordion>
                   
                
                <div className="form-group">
                    <div className="hint-text">Already have an account? <a href="/signin">Login here</a></div>
                    <div className="leftSubmit">
                        <button type="submit" className="btn btn-info btn-lg" onClick={submitHandler}>Submit</button>
                    </div>
                </div>
            </div>
    
        </div>
        </>
    )
    
}