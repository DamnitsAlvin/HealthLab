import React, {useEffect, useState} from "react"; 
import {userBasicAppointment,removeBasicAppointment, addPatient} from "../actions/userActions";
import {useDispatch, useSelector} from "react-redux"; 
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

            if(!gg.data.appointment){
                navigate("/sorrypage")
            }

        }else{
            navigate(`/signin?userType=user&redirect=/createAppointment?doctor=${doc_id}&mode=2`)
        }
    }, [userInfo])

   
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
    const [apptime, setappTime] = useState([])
    const [ggtime, setTime] = useState()
    
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
                dispatch(userBasicAppointment([appreq,  id , doc_id,  PreferredDate,ggtime, description, Appmode ]));
                return appreq
            })
            
        }else{
            setAppointmentRequest((appreq)=>{
                dispatch(userBasicAppointment([appreq,  id , doc_id,  PreferredDate,ggtime,  description, Appmode ]));
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
        var values = []
        if(data){
            setdateFull(data.dateFull)
            setPreferredDate(event.target.value)
            if(data.appointments){
                data.appointments.map(val=>{
                    values.push(val[4])
                })
                setappTime(values)
                values = []
            }
        }
    }
    console.log("appointment times: ", ggtime)
 

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

            <div class="form-group">
                <label for="formGroupExampleInput">Preferred Time</label>
                <div id="spaceSlot" className="btn btn-main" data-toggle="modal" data-target="#timeslotModal">Choose schedule</div>
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

        <div class="modal fade" id="timeslotModal" tabindex="-1" role="dialog" aria-labelledby="timeslotModal" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Available Time Slot</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div class="modal-body" id="longSlot">
                        <div className='dateSlot'><h5>{PreferredDate ? PreferredDate: "2022-01-01" }</h5></div>
                        <div id="room-form">
                            <fieldset>
                                <legend className={apptime.findIndex(x => x === "08:00") > -1 ? "alert alert-danger": ""}><input class="timeslot" type="radio" name="timeslot-8-5" disabled={apptime.findIndex(x => x=="08:00") > -1} value='08:00' onChange={e => setTime(e.target.value)}/><label>8:00 AM - 9:00 AM</label></legend>
                                <legend className={apptime.findIndex(x => x === "09:00") > -1 ? "alert alert-danger": ""}><input class="timeslot" type="radio" name="timeslot-8-5" disabled={apptime.findIndex(x => x=="09:00") > -1} value='09:00' onChange={e => setTime(e.target.value)}/><label>9:00 AM - 10:00 AM</label></legend>
                                <legend className={apptime.findIndex(x => x === "10:00") > -1 ? "alert alert-danger": ""}><input class="timeslot" type="radio" name="timeslot-8-5" disabled={apptime.findIndex(x => x=="10:00") > -1} value='10:00' onChange={e => setTime(e.target.value)}/><label>10:00 AM - 11:00 AM</label></legend>
                                <legend className={apptime.findIndex(x => x === "11:00") > -1 ? "alert alert-danger": ""}><input class="timeslot" type="radio" name="timeslot-8-5" disabled={apptime.findIndex(x => x=="11:00") > -1} value='11:00' onChange={e => setTime(e.target.value)}/><label>11:00 AM - 12:00 Noon</label></legend>
                                <legend className={apptime.findIndex(x => x === "12:00") > -1 ? "alert alert-danger": ""}><input class="timeslot" type="radio" name="timeslot-8-5" disabled={apptime.findIndex(x => x=="12:00") > -1} value='12:00' onChange={e => setTime(e.target.value)}/><label>12:00 Noon - 1:00 PM</label></legend>
                                <legend className={apptime.findIndex(x => x === "13:00") > -1 ? "alert alert-danger": ""}><input class="timeslot" type="radio" name="timeslot-8-5" disabled={apptime.findIndex(x => x=="13:00") > -1} value='13:00' onChange={e => setTime(e.target.value)}/><label>1:00 PM - 2:00 PM</label></legend>
                                <legend className={apptime.findIndex(x => x === "14:00") > -1 ? "alert alert-danger": ""}><input class="timeslot" type="radio" name="timeslot-8-5" disabled={apptime.findIndex(x => x=="14:00") > -1} value='14:00' onChange={e => setTime(e.target.value)}/><label>2:00 PM - 3:00 PM</label></legend>
                                <legend className={apptime.findIndex(x => x === "15:00") > -1 ? "alert alert-danger": ""}><input class="timeslot" type="radio" name="timeslot-8-5" disabled={apptime.findIndex(x => x=="15:00") > -1} value='15:00' onChange={e => setTime(e.target.value)}/><label>3:00 PM - 4:00 PM</label></legend>
                                <legend className={apptime.findIndex(x => x === "16:00") > -1 ? "alert alert-danger": ""}><input class="timeslot" type="radio" name="timeslot-8-5" disabled={apptime.findIndex(x => x=="16:00") > -1} value='16:00' onChange={e => setTime(e.target.value)}/><label>4:00 PM - 5:00 PM</label></legend>
                            </fieldset>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" data-dismiss="modal">Submit</button>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    );
}