import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerBasicInformationDoctor, registerEducInformationDoctor, registerSpecialtyInformationDoctor } from "../actions/doctorActions";
import Accordion from "../components/accordion"

export default function RegisterDoctor(){
    const dispatch = useDispatch()
    const[tabPills, settabPills] = useState([])
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
        mode_of_consultation: "Virtual", 
        doctor_image: "", 
        password: "", 
    })

    const [educ, setEduc] = useState({
        doctor_id: "",
        Degree: "Undergraduate", 
        Course: "", 
        School_name: "", 
        Grad_date: ""
    })

    const [specialty, setSpecialty] = useState({
        doctor_id: "",
        specialization: "", 
        sub_specialization: ""
    })

    if(formState){
        console.log(formState)
    }
    if(educ){
        console.log(educ)
    }
    if(specialty){
        console.log(specialty)
    }

  
    const specializationHandler = (event) =>{
        setSpecialty({
            ...specialty, 
            [event.target.name] : event.target.value
        })
    }
    const EducInformationInputHandler = (event) =>{
        setEduc({
            ...educ,
            [event.target.name]:event.target.value
        })
    }

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
        return doctor_id
    }

    const submitHandler = () =>{
        const doctor_id = generateDoctorId()
        setformState({
            ...formState, 
            doctor_id: doctor_id
        })
        setEduc({
            ...educ, 
            doctor_id: doctor_id 
        })
        setSpecialty({
            ...specialty, 
            doctor_id: doctor_id
        })

        dispatch(registerBasicInformationDoctor(formState))
        dispatch(registerEducInformationDoctor(educ))
        dispatch(registerSpecialtyInformationDoctor(specialty))
    }   


    return(
        <form method="post" onSubmit={submitHandler}>
            <div className="centerContainer">
                 <h2>Register here</h2>
		        <p>Please fill in this form to create an account</p>
		        <hr/>
                <Accordion title="Basic Information" active={true}>
                <div className="form-group">
                    <div className="row">
                        <div className="col-xs-6"><input type="text" className="form-control" name="first_name" placeholder="&#xf47f; First Name" onChange={BasicInformationInputHandler}/></div>
                        <div className="col-xs-6"><input type="text" className="form-control" name="middle_name" placeholder="&#xf47f; Middle Name" onChange={BasicInformationInputHandler}/></div>  
                    </div>        	
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-xs-6"><input type="text" className="form-control" name="last_name" placeholder="&#xf47f; Last Name"  required="required" onChange={BasicInformationInputHandler}/></div>
                        <div className="col-xs-6"><input type="text" className="form-control" name="suffix" placeholder="&#xf47f; Suffix" onChange={BasicInformationInputHandler}/></div>  
                    </div>        	
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" name="phone" placeholder="&#xf47f; xxxx-xxx-xxxx" pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}" required onChange={BasicInformationInputHandler}/>      
                </div>
                <div className="form-group">
        	        <input type="email" className="form-control" name="email" placeholder="&#xf47f; Email"  required="required" onChange={BasicInformationInputHandler}/>
                </div>

                <div className="form-group">
                    <input type="date" className="form-control" name="birthday" placeholder="&#xf47f; Birthday" onChange={BasicInformationInputHandler}/>
                </div>
                <hr/>

                
                <div className="form-group">
                        <label className="col-form-label col-4">Mode of Consultation</label>
                        <select className="form-control" name="mode_of_consultation" onChange={BasicInformationInputHandler}>
                            <option value="Virtual">&#xf47f; Virtual</option>
                            <option value="Face to Face">&#xf47f; Face to Face</option>
                            <option value="Both">&#xf47f; Both</option>
                        </select>
                </div>


                <div className="form-group">
                <label className="col-form-label col-4">Password</label>    
                    <div className="row">
                        <div className="col-xs-12"><input type="password" className="form-control" name="password" placeholder="&#xf47f; Password" onChange={BasicInformationInputHandler} /></div>
                    </div> 
                </div>

                <div className="form-group">
                <label className="col-form-label col-4">Confirm Password</label>    
                    <div className="row">
                        <div className="col-xs-12"><input type="password" className="form-control" name="confirm_password" placeholder="&#xf47f; Password" onChange={(e)=>setConfirmpassword(e.target.value)} /></div>
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
          
        </form>
    );
}