import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerBasicInformationDoctor } from "../actions/doctorActions";
import Accordion from "../components/accordion"; 
import { useNavigate } from "react-router-dom";
import { checkEmail } from "../actions/userActions";

export default function RegisterDoctor(){
    const dispatch = useDispatch()
    const [confirm_password, setConfirmpassword] = useState("")
    const [formState, setformState] = useState({
        doctor_id: "",
        first_name: "", 
        middle_name: "", 
        last_name: "", 
        suffix : "", 
        birthday: "", 
        phone: "", 
        email: '', 
        mode_of_consultation: 1, 
        doctor_image: "", 
        password: "", 
    })
    const navigate = useNavigate()
    const selector = useSelector((x)=>x.doctorBasicRegister)
    const {docBasicReg, error} = selector
    const emailchecker = useSelector((x)=>x.emailCheck)
    const {emailError} = emailchecker
    const [servicePic, setservicePic] = useState()


    const BasicInformationInputHandler = (event) =>{
        setformState({
            ...formState, 
            [event.target.name] : event.target.value
        })
    }   
    

    const generateDoctorId = () =>{
        var date = new Date(); 
        var time = date.getMinutes() +""+ date.getMilliseconds();
        var doctor_id = formState["first_name"] && formState["last_name"]  ? formState["first_name"].substring(0,1).toUpperCase()+"."+formState["last_name"].toUpperCase()+time: "";
        const value = {...formState}
        value.doctor_id = doctor_id;
        if(servicePic){
            console.log("service picture was found ")
            const extension = servicePic.name.split(".")[1]
            const filename = `/uploads/${doctor_id}Image.${extension}`
            const values = {...formState}
            values.doctor_image = filename
            setformState(values)
        }
        setformState(value)
        
        return doctor_id
    }

    const submitHandler = (e) =>{
        e.preventDefault(); 
        const doctor_id = generateDoctorId()
        console.log("Doctor ID: ", doctor_id)
        setformState(formState =>{
            dispatchAction(formState, doctor_id)
            return formState
        })
       
    }   
    const imageFileHandler = (event) =>{
        console.log("Triggered image file handler")
        setservicePic(event.target.files[0])
    }

    const dispatchAction = (form, id) =>{
        dispatch(registerBasicInformationDoctor(form))
        console.log(`/success?username=${id}`)
        if(!error){
            navigate(`/success?username=${id}`)
        }
    }
    useEffect(()=>{
        dispatch(checkEmail(formState.email))
    }, [formState.email])

    return(
        <form method="post" onSubmit={submitHandler} encType="multipart/form-data" >
             <div className="wow fadeInDown" data-wow-delay="0.1s">
            <div className="centerContainer">
                <h2>Register here</h2>
		        <p>Please fill in this form to create an account</p>
		        <hr/>
                <Accordion title="Basic Information" active={true}>
                <div className="form-group">
                    <div className="row">
                        <div className="col-xs-6"><input type="text" className="form-control" name="first_name" placeholder="&#xf2bb; First Name" onChange={BasicInformationInputHandler}/></div>
                        <div className="col-xs-6"><input type="text" className="form-control" name="middle_name" placeholder="&#xf2bb; Middle Name" onChange={BasicInformationInputHandler}/></div>  
                    </div>        	
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-xs-6"><input type="text" className="form-control" name="last_name" placeholder="&#xf2bb; Last Name"  required="required" onChange={BasicInformationInputHandler}/></div>
                        <div className="col-xs-6"><input type="text" className="form-control" name="suffix" placeholder="&#x49; Suffix" onChange={BasicInformationInputHandler}/></div>  
                    </div>        	
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" name="phone" placeholder="&#xf095; xxxx-xxx-xxxx" pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}" required onChange={BasicInformationInputHandler}/>      
                </div>
                <div className="form-group">
        	        <input type="email" className="form-control" name="email" placeholder="&#xf0e0; Email"  required="required" onChange={BasicInformationInputHandler}/>
                    {emailError && <span>Email is already in use</span>}
                </div>

                <div className="form-group">
                    <input type="date" className="form-control" name="birthday" placeholder="Birthday" onChange={BasicInformationInputHandler}/>
                </div>
                <hr/>

                
                <div className="form-group">
                        <label className="col-form-label col-4">Mode of Consultation</label>
                        <select className="form-control" name="mode_of_consultation" onChange={BasicInformationInputHandler}>
                            <option value="0">&#xf03d; Virtual</option>
                            <option value="1">&#xf500; Face to Face</option>
                            <option value="2">&#xf0c0; Both</option>
                        </select>
                </div>
                <div className="form-group">
                <label className="col-form-label col-4">Doctor Image</label>    
                    <div className="row">
                        <div className="col-xs-12"><input type="file" className="form-control" name="doctor_image" onChange={(event)=>imageFileHandler(event)} /></div>
                    </div> 
                </div>

                <div className="form-group">
                <label className="col-form-label col-4">Password</label>    
                    <div className="row">
                        <div className="col-xs-12"><input type="password" className="form-control" name="password" placeholder="&#xf023; Password" onChange={BasicInformationInputHandler} /></div>
                    </div> 
                </div>

                <div className="form-group">
                <label className="col-form-label col-4">Confirm Password</label>    
                    <div className="row">
                        <div className="col-xs-12"><input type="password" className="form-control" name="confirm_password" placeholder="&#xf023; Confirm Password" onChange={(e)=>setConfirmpassword(e.target.value)} /></div>
                    </div> 
                </div>

                {
                    formState["password"] !== confirm_password && 
                    <div className="form-group">
                        Password does not match!
                    </div>
                }
                

                </Accordion>
                
              
                <div className="form-group">
                    <div className="hint-text">Already have an account? <a href="/signin">Login here</a></div>
                    <div className="leftSubmit">
                        <button type="submit" className="btn btn-info btn-lg" >Submit</button>
                    </div>
                </div>
            </div>
          </div>
        </form>
    );
}