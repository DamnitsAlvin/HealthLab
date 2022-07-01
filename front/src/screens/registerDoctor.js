import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerBasicInformationDoctor,UpdateImage } from "../actions/doctorActions";
import Accordion from "../components/accordion"; 
import { useNavigate } from "react-router-dom";
import { checkEmail } from "../actions/userActions";
import axios from 'axios'

export default function RegisterDoctor(){
    const dispatch = useDispatch()
    const dispatch1 = useDispatch()
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
    const {loading, docBasicReg, error} = selector
    const [docImage, setdocImage] = useState()
    const emailchecker = useSelector((x)=>x.emailCheck)
    const {emailError} = emailchecker
    const [servicePic, setservicePic] = useState()
    const [fileName, setFileName] = useState()


    const BasicInformationInputHandler = (event) =>{
        //try 2
        const values = {...formState}
        values[event.target.name] = event.target.value
        setformState(values)
      
    }   
    

    const generateDoctorId = () =>{
        var date = new Date(); 
        var time = date.getMinutes() +""+ date.getMilliseconds();
        var doctor_id = formState["first_name"] && formState["last_name"]  ? formState["first_name"].substring(0,1).toUpperCase()+"."+formState["last_name"].toUpperCase()+time: "";
        const values = {...formState}
        values.doctor_id = doctor_id
        setformState(values)
        return doctor_id
    }

    const submitHandler = (e) =>{
        e.preventDefault(); 
        const doctor_id = generateDoctorId()
        console.log("Doctor ID: ", doctor_id)
        const formData = new FormData()
        if(servicePic){
            const extension = fileName.split(".")[1]
            const filedet = "/uploads/" +doctor_id +"Image."+extension
            formData.append('id', doctor_id)
            formData.append('file', servicePic)
            setformState((formState)=>{
                return(
                    {
                        ...formState, 
                        doctor_image: filedet
                    }
                )
            })
        }

        setformState(formState =>{
            console.log(formState)
            saveToDatabase(formState, doctor_id)
            return formState
        })

        if(servicePic){
            dispatch(UpdateImage(formData))
        }
    }   


    const saveToDatabase = async(info,id) =>{
        const response = await axios.post("http://localhost:5000/api/doctorbasicreg", info)
        if(response.status==200){
            navigate(`/success?username=${id}`)
        }
        console.log(response)
    }

    const fileHandler = (event) =>{
        setservicePic(event.target.files[0])
        setFileName(event.target.files[0].name)
    }

  
    useEffect(()=>{
        dispatch(checkEmail(formState.email))
    }, [formState.email])


    setTimeout(() => {
        const inter = document.getElementById("inter")
        if(inter){
            inter.style.display = "none"
        }
        
    }, 3000);

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
                        <div className="col-xs-12"><input type="file" className="form-control" name="doctor_image" onChange={(event) => fileHandler(event)} /></div>
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
                    {error ? <div className= "alert alert-danger" id="inter">Save Failed</div> : !error ? <div id="inter" className="alert alert-success">Saved successfully</div> : <></>}
                    <div className="leftSubmit">
                        <button type="submit" className="btn btn-info btn-lg" disabled={loading}>Submit</button>
                    </div>
                </div>
            </div>
          </div>
        </form>
    );
}