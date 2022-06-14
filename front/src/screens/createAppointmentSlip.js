import React, {useEffect, useState} from "react"; 
import {userBasicAppointment,removeBasicAppointment, addPatient} from "../actions/userActions";
import {useDispatch, useSelector} from "react-redux"; 
import AppointmentSteps from "../components/appointmentSteps";
import { useNavigate, useSearchParams } from "react-router-dom";


export default function CreateAppointmentSlip(props){
    const getUserAppointmentRequest = useSelector(x=>x.appointmentRequest); 
    const {saveBasicAppointment} = getUserAppointmentRequest; 
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const doc_id = searchParams.get("doctor")

    var id=""; 
    const getUserInfo = useSelector(x=>x.userSignIn); 
    const { userInfo } = getUserInfo
    if(userInfo){
        id =  userInfo.data[0];
    }
    

    const [PatientFirstName, setPatientFirstName] = useState(userInfo.data[3]);
    const [PatientLastName, setPatientLastName] = useState(userInfo.data[4]); 
    const [Email, setEmail] = useState(userInfo.data[1]); 
    const [Birthday, setBirthday] = useState('')
    const [Gender, setGender] = useState('')
    const [PreferredDate, setPreferredDate] = useState("");
    const [toSelf, setToSelf] = useState(true);                     
    const [appointmentRequest, setAppointmentRequest] = useState("");
    const [description, setDescription] = useState()
   
    const dispatch = useDispatch()
    var date = new Date(); 
    var time = date.getDate()+""+date.getMonth()+1+""+date.getFullYear()+""+ date.getMilliseconds();

    useEffect(()=>{
        setAppointmentRequest("PTR"+time);
    }, []);
    console.log("To self: ", toSelf)
   
    const NextHandler = (e) =>{
        e.preventDefault();
        navigate(`/`);
        
        if(!toSelf){
            id = "PATIENT" + time
            dispatch(userBasicAppointment([appointmentRequest,  id , doc_id,  PreferredDate ]));
            dispatch(addPatient([id, userInfo.data[0], PatientFirstName, PatientLastName, Birthday, Gender])) //save patient details to local storage
        }else{
            dispatch(userBasicAppointment([appointmentRequest,  id , doc_id,  PreferredDate ]));
        }
    }

    const cancelHandler = (e)=>{
        e.preventDefault();
        navigate("/");
        dispatch(removeBasicAppointment());
    }

    
  


    return(

        <div className="signup-form">
            <form onSubmit={NextHandler}>
            <h2>Appointment Request</h2>
            <p>Please fill in this form to create an appointment request!</p>
            <hr/>
            <AppointmentSteps step1/>

            <div className="form-group">
                <label htmlFor="fullName">Is the appointment for yourself or others?</label>
                <select className="form-control" onChange={()=> setToSelf(!toSelf)}>
                    <option >Yes</option>
                    <option >No</option>
                </select>
            </div>

            {
                toSelf ? (
                <>
                <div className="form-group">
                    <input type="text" className="form-control"  placeholder="Patient First Name" value ={PatientFirstName} required="required" readOnly />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control"  placeholder="Patient Last Name" value ={PatientLastName} required="required" readOnly/>
                </div>
                <div className="form-group">
                    <input type="email" className="form-control"  placeholder="Email" value={Email} required="required" readOnly/>
                </div>
            </>
            ) : (
                <>
               <div className="form-group">
                    <label htmlFor="fullName">Relationship with the patient</label>
                    <input type="text" className="form-control"  placeholder="Son, Daughter, Cousin, Sister, Brother"  required="required" />
                 </div>
                <div className="form-group">
                    <label htmlFor="fullName">First Name</label>
                    <input type="text" className="form-control"  placeholder="Patient First Name" value ={PatientFirstName} onChange={(event)=> setPatientFirstName(event.target.values)} required="required"  />
                </div>
                <div className="form-group">
                    <label htmlFor="fullName">Last Name</label>
                    <input type="text" className="form-control"  placeholder="Patient Last Name" value ={PatientLastName} onChange={(event)=> setPatientLastName(event.target.values)} required="required" />
                </div>
                
                <div className="form-group">
                    <label className="col-form-label col-4">BIRTHDATE</label>
                    <input type="date" className="form-control" name="username" placeholder="Birthday" required="required" onChange={(event)=> setBirthday(event.target.value)}/>
                </div>
                <div className="form-group">
                        <label className="col-form-label col-4">GENDER</label>
                        <select className="form-control" onChange={event => setGender(event.target.value)}>
                            <option value="Male" >Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </>
            )
            }

            <div class="form-group">
                <label for="exampleFormControlTextarea1">Description</label>
                <textarea class="form-control" id="textArea" rows="3" placeholder="Enter other details you want to tell the Dentist" onChange={e=>setDescription(e.target.value)}></textarea>
            </div>

            <div className="form-group">
                <label className="control-label" for="date">Preferred Date</label>
                <input type="date"  placeholder="Preferred Date" className="form-control input-md" onChange={e=>setPreferredDate(e.target.value)}/>
            </div>
            
            
            <div className="form-group">
                    <button className="btn btn-primary btn-lg cancelButton" onClick={cancelHandler} >Cancel</button>
                    <button type="submit" className="btn btn-primary btn-lg" >Next</button>  
            </div>
            
		
    </form>
    </div>
    );
}