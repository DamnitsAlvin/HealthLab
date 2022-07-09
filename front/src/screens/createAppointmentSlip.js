import React, {useEffect, useState} from "react"; 
import {userBasicAppointment,removeBasicAppointment, addPatient} from "../actions/userActions";
import {useDispatch, useSelector} from "react-redux"; 
import AppointmentSteps from "../components/appointmentSteps";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";


export default function CreateAppointmentSlip(props){
    const getUserAppointmentRequest = useSelector(x=>x.appointmentRequest); 
    const {SaveAppointment} = getUserAppointmentRequest; 
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const doc_id = searchParams.get("doctor")
    const mode = searchParams.get('mode')
    const [id, setId] = useState()

    const getUserInfo = useSelector(x=>x.userSignIn); 
    const { userInfo } = getUserInfo

    useEffect( async()=>{
        if(userInfo){
            setId(()=> userInfo.data[0])  
        }

        if(userInfo){
            const {status, data} = await axios.post("http://localhost:5000/api/checkuserappointment", {id: userInfo.data[0]})
            if(!data.appointment || status != 200 ){
                navigate("/sorrypage")
            }
            const gg = await axios.post("http://localhost:5000/api/checkuserdoctorreport", {
                'user':userInfo.data[0] , 
                'doctor': doc_id
            })
            console.log(gg)
            if(!gg.data.appointment){
                navigate("/sorrypage")
            }

        }else{
            navigate(`/signin?userType=user&redirect=/createAppointment?doctor=${doc_id}&mode=2`)
        }
    }, [userInfo])

    console.log("id:", id)
   
    

    const [PatientFirstName, setPatientFirstName] = useState(userInfo && userInfo.data[3]);
    const [PatientLastName, setPatientLastName] = useState(userInfo && userInfo.data[4]); 
    const [Email, setEmail] = useState(userInfo && userInfo.data[1]); 
    const [Birthday, setBirthday] = useState('')
    const [Gender, setGender] = useState('')
    const [PreferredDate, setPreferredDate] = useState("");
    const [toSelf, setToSelf] = useState(true);                     
    const [appointmentRequest, setAppointmentRequest] = useState("");
    const [Relationship, setRelationship] = useState("")
    const [description, setDescription] = useState()
    const [dateFull, setdateFull] = useState(false)
    const [Appmode, setMode] = useState(mode==0 ? "Online": mode==1 ? "Face to Face" : "Online")
    
    console.log(PatientFirstName)
    const dispatch = useDispatch()
    var date = new Date(); 
    var time = date.getDate()+""+date.getMonth()+1+""+date.getSeconds()+""+ date.getMilliseconds();

    
    
    const removeappointmentsuccess = () => async(dispatch) =>{
        dispatch({type: 'REMOVE_APPOINTMENT_SUCCESS'})
    }
   
    const NextHandler = (e) =>{
        e.preventDefault(); 
        setAppointmentRequest("PTR"+time); 
        if(!toSelf){
            id = "PATIENT" + time
            dispatch(addPatient([id, userInfo.data[0], PatientFirstName, PatientLastName, Relationship,  Birthday, Gender])) //save patient details to local storage
            setAppointmentRequest((appreq)=>{
                dispatch(userBasicAppointment([appreq,  id , doc_id,  PreferredDate, description, Appmode ]));
                return appreq
            })
            
        }else{
            setAppointmentRequest((appreq)=>{
                dispatch(userBasicAppointment([appreq,  id , doc_id,  PreferredDate, description, Appmode ]));
                return appreq
            })
        }
    }
    useEffect(()=>{
        if(SaveAppointment && SaveAppointment.success){
            dispatch(removeappointmentsuccess())
            navigate("/appointments")
        }
    }, [SaveAppointment])

    const cancelHandler = (e)=>{
        e.preventDefault();
        navigate("/");
        dispatch(removeBasicAppointment());
    }

    const dateHandler = async(event) =>{
        const {data} = await axios.get(`http://localhost:5000/api/checkDate?date=${event.target.value}&doc_id=${doc_id}`)
        if(data){
            setdateFull(data.dateFull)
            setPreferredDate(event.target.value)
        }
        
    }


    return(

        <div className="signup-form">
            <form >
            <h2 id="colorh2">Appointment Request</h2>
            <p>Please fill in this form to create an appointment requests!</p>
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
                    <input type="text" className="form-control"  placeholder="Patient First Name" value ={PatientFirstName} required readOnly />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control"  placeholder="Patient Last Name" value ={PatientLastName} required readOnly/>
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
                        <option value='Face to Face'>Face to Face</option>
                        <option value='Online'>Online</option>
                    </select>
                </div>
            
            </>):(
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Appointment Mode</label>
                    <input className="form-control" id="textArea" value={mode==0 ? "Online": "Face To Face"}readOnly></input>
                </div>
            )}

            <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Description</label>
                <textarea className="form-control" id="textArea" rows="3" placeholder="Enter other details you want to tell the Doctor" onChange={e=>setDescription(e.target.value)}></textarea>
            </div>

            <div className="form-group">
                <label className="control-label" htmlFor="date">Preferred Date</label>
                <input type="date"  placeholder="Preferred Date" className="form-control input-md" required onChange={e=>dateHandler(e)} />
            </div>
            {/** Here goes the message if date is not available */
                dateFull && <div className="alert alert-danger">Schedule is already full</div>
            }
            {SaveAppointment && !SaveAppointment.success && (
                    <div className="alert alert-danger">Error saving the data</div>
            )}
            
            <div className="form-group">
                    <button className="btn btn-primary btn-lg cancelButton" onClick={cancelHandler} >Cancel</button>
                    <button type="submit" className="btn btn-primary btn-lg" disabled={dateFull} onClick={NextHandler}>Next</button>  
            </div>
            
		
    </form>
    </div>
    );
}