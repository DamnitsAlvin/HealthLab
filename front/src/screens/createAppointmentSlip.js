import React, {useEffect, useState} from "react"; 
import {userBasicAppointment,removeBasicAppointment, addPatient} from "../actions/userActions";
import {useDispatch, useSelector} from "react-redux"; 
import AppointmentSteps from "../components/appointmentSteps";
import { useNavigate, useSearchParams } from "react-router-dom";


export default function CreateAppointmentSlip(props){
    const getUserAppointmentRequest = useSelector(x=>x.appointmentRequest); 
    const {SaveAppointment} = getUserAppointmentRequest; 
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const doc_id = searchParams.get("doctor")
    const mode = searchParams.get('mode')

    var id=""; 
    const getUserInfo = useSelector(x=>x.userSignIn); 
    const { userInfo } = getUserInfo
    console.log(SaveAppointment)
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
    const [Relationship, setRelationship] = useState("")
    const [description, setDescription] = useState()
    const [Appmode, setMode] = useState(mode==0 ? "Online": mode==1 ? "Face to Face" : "Online")
   
    const dispatch = useDispatch()
    var date = new Date(); 
    var time = date.getDate()+""+date.getMonth()+1+""+date.getSeconds()+""+ date.getMilliseconds();

    useEffect(()=>{
        setAppointmentRequest("PTR"+time);
    }, []);
  
   
    const NextHandler = (e) =>{
        e.preventDefault();  
        if(!toSelf){
            id = "PATIENT" + time
            dispatch(addPatient([id, userInfo.data[0], PatientFirstName, PatientLastName, Relationship,  Birthday, Gender])) //save patient details to local storage
            dispatch(userBasicAppointment([appointmentRequest,  id , doc_id,  PreferredDate, description, Appmode ]));
        }else{
            dispatch(userBasicAppointment([appointmentRequest,  id , doc_id,  PreferredDate, description, Appmode ]));
        }
    }
    useEffect(()=>{
        if(SaveAppointment && SaveAppointment.success){
            navigate("/appointments")
        }
    }, [SaveAppointment])

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
                    <input type="text" className="form-control"  placeholder="Son, Daughter, Cousin, Sister, Brother"  required="required" onChange={(event)=>{setRelationship(event.target.value)}} />
                 </div>
                <div className="form-group">
                    <label htmlFor="fullName">First Name</label>
                    <input type="text" className="form-control"  placeholder="Patient First Name"  onChange={(event)=> setPatientFirstName(event.target.value)} required="required"  />
                </div>
                <div className="form-group">
                    <label htmlFor="fullName">Last Name</label>
                    <input type="text" className="form-control"  placeholder="Patient Last Name"  onChange={(event)=> setPatientLastName(event.target.value)} required="required" />
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
            {mode == 2 ?(<>
                <div className="form-group">
                    <label htmlFor="fullName">Appointment Mode</label>
                    <select className="form-control" onChange={(event)=> setMode(event.target.value)} required>
                        <option value='Online'>Online</option>
                        <option value='Face to Face'>Face to Face</option>
                    </select>
                </div>
            
            </>):(
                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Appointment Mode</label>
                    <input class="form-control" id="textArea" value={mode==0 ? "Online": "Face To Face"}readOnly></input>
                </div>
            )}

            <div class="form-group">
                <label for="exampleFormControlTextarea1">Description</label>
                <textarea class="form-control" id="textArea" rows="3" placeholder="Enter other details you want to tell the Doctor" onChange={e=>setDescription(e.target.value)}></textarea>
            </div>

            <div className="form-group">
                <label className="control-label" for="date">Preferred Date</label>
                <input type="date"  placeholder="Preferred Date" className="form-control input-md" onChange={e=>setPreferredDate(e.target.value)}/>
            </div>
            {SaveAppointment && !SaveAppointment.success && (
                    <div className="alert alert-danger">Error saving the data</div>
            )}
            
            <div className="form-group">
                    <button className="btn btn-primary btn-lg cancelButton" onClick={cancelHandler} >Cancel</button>
                    <button type="submit" className="btn btn-primary btn-lg" >Next</button>  
            </div>
            
		
    </form>
    </div>
    );
}