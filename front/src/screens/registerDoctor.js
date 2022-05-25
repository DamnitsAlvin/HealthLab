import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerBasicInformationDoctor } from "../actions/doctorActions";
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

    const submitHandler = (e) =>{
        e.preventDefault();
        const doctor_id = generateDoctorId()
        setformState({
            ...formState, 
            [doctor_id]: doctor_id
        })
        dispatch(registerBasicInformationDoctor(formState))
    }   


    return(
        <form method="post" onSubmit={submitHandler} encType="multipart/form-data" >
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
                </div>

                <div className="form-group">
                    <input type="date" className="form-control" name="birthday" placeholder="Birthday" onChange={BasicInformationInputHandler}/>
                </div>
                <hr/>

                
                <div className="form-group">
                        <label className="col-form-label col-4">Mode of Consultation</label>
                        <select className="form-control" name="mode_of_consultation" onChange={BasicInformationInputHandler}>
                            <option value="Virtual">&#xf03d; Virtual</option>
                            <option value="Face to Face">&#xf500; Face to Face</option>
                            <option value="Both">&#xf0c0; Both</option>
                        </select>
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
          
        </form>
    );
}