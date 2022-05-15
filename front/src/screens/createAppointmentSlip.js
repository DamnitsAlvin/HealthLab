import React, {useEffect, useState} from "react"; 
import {userBasicAppointment,removeBasicAppointment} from "../actions/userActions";
import {useDispatch, useSelector} from "react-redux"; 
import AppointmentSteps from "../components/appointmentSteps";


export default function CreateAppointmentSlip(props){
    const getUserAppointmentRequest = useSelector(x=>x.appointmentRequest); 
    const {saveBasicAppointment} = getUserAppointmentRequest; 
    var id=""; 
    const getUserInfo = useSelector(x=>x.userSignIn); 
    const { userInfo } = getUserInfo
    if(userInfo){
        id =  userInfo.data[0];
    }
    
    const doctorInfo = useSelector(x=>x.loadDoctor); 
    const {doctor} = doctorInfo; 

    const [PatientFirstName, setPatientFirstName] = useState(userInfo.data[1]);
    const [PatientLastName, setPatientLastName] = useState(userInfo.data[2]); 
    const [Email, setEmail] = useState(userInfo.data[13]); 
    const [Phone, setPhoneNumber] = useState(userInfo.data[12])
    const [ServiceType, setServiceType] = useState("Dentistry");
    const [PreferredDate, setPreferredDate] = useState("");
    const [PreferredTime, setPreferredTime] = useState("");
    const [DropdownDoctor, setDropdownDoctor] = useState([])
    const [dropdownName, setDropdownName]= useState([])
    const [PickDoctor, setPickDoctor] = useState("")

    const [toSelf, setToSelf] = useState("Yes");                     //for future considerations
    const [addressLine1, setAddress1] = useState("");
    const [addressLine2, setAddress2] = useState("");
    const [Municipality, setMunicipality] = useState("");
    const [provice, setProvince] = useState(""); 
    const [appointmentRequest, setAppointmentRequest] = useState("");
   
    const dispatch = useDispatch()

    const dropdownHandler = (text) =>{
        setServiceType(text); 

        let matches = []; 
        let matchesInfo = [];
        if(text.length > 0){
            matches = doctor.data.filter((doc,index)=>{
                const regex = new RegExp(`${text}`, "gi");
                if(doc[1].match(regex)){
                    matchesInfo.push(doctor.doctor_info[index])
                    return doc[1].match(regex)
                }
                
            })
        }
        setDropdownDoctor(matches)
        setPickDoctor(matches[0][1])
        setDropdownName(matchesInfo)
    }
    
    const dropdownChange = (text)=>{
        console.log("called")
        console.log(text);
        setPickDoctor(text)
    }
    const toSelfHandler = (value) =>{                               //intended for future purposes
        if(value==="Yes"){
            setPatientFirstName(userInfo.data[1]);
            setPatientLastName(userInfo.data[2]); 
            setEmail(userInfo.data[13]); 
            setPhoneNumber(userInfo.data[12]);
        }
        else{
            setPatientFirstName(saveBasicAppointment.PatientFirstName);
            setPatientLastName(saveBasicAppointment.PatientLastName); 
            setEmail(saveBasicAppointment.PatientEmail); 
            setPhoneNumber(saveBasicAppointment.PhoneNumber);
        }
        setToSelf(value);
    }

    const NextHandler = (e) =>{
        e.preventDefault();
        props.history.push("/medicalCard");
        
        dispatch(userBasicAppointment({appointmentRequest,  id ,PickDoctor,  PatientFirstName, PatientLastName, Email, Phone, ServiceType, PreferredDate, PreferredTime}));

    }

    const cancelHandler = (e)=>{
        e.preventDefault();
        props.history.push("/");
        dispatch(removeBasicAppointment());
    }

    
  
    var date = new Date(); 
    var time = date.getDate()+""+date.getMonth()+1+""+date.getFullYear()+""+ date.getMilliseconds();

    useEffect(()=>{
        dropdownHandler("Dentistry");
        setAppointmentRequest("PTR"+time);
    }, []);
    
   
   
//     <div className="form-group">
//     <label className="col-form-label col-4">Appointment For Self?</label>
//     <div className="form-check form-check-inline">
//         <input className="form-check-input" type="radio"  name="toWhom" value="Yes" onChange={(e)=>{toSelfHandler(e.target.value)}} required/>
//         <label className="form-check-label" > Yes</label>
//     </div>
//     <div className="form-check form-check-inline">
//         <input className="form-check-input" type="radio"  name="toWhom" value="No"  onChange={(e)=>{toSelfHandler(e.target.value)}} required disabled/>
//         <label className="form-check-label" > No</label>
//     </div>
//     </div>
   
   
    return(

        <div className="signup-form">
    <form onSubmit={NextHandler}>
		<h2>Appointment Request</h2>
		<p>Please fill in this form to create an appointment request!</p>
		<hr/>
        <AppointmentSteps step1/>
        {
            toSelf === "No" && (
            <div className="form-group">
        	    <input type="text" className="form-control"  placeholder="Relationship with the Patient"  required="required" />
            </div>
            )
        }
      
        <div className="form-group">
        	<input type="text" className="form-control"  placeholder="Patient First Name" value ={PatientFirstName} required="required" readOnly />
        </div>
        <div className="form-group">
        	<input type="text" className="form-control"  placeholder="Patient Last Name" value ={PatientLastName} required="required" readOnly/>
        </div>
        <div className="form-group">
        	<input type="email" className="form-control"  placeholder="Email" value={Email} required="required" readOnly/>
        </div>
		<div className="form-group">
            <input type="text" className="form-control"  placeholder="Phone"  value ={Phone}required="required" readOnly/>
        </div>
		
        {
            toSelf === "No" && (
            <>
                <div className="form-group">
                    <input type="text" className="form-control" name="address" placeholder="House number, Street" value= {addressLine1}required="required" onChange={(e)=>{setAddress1(e.target.value)}}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" name="address" placeholder="Subdivision, Barangay" value={addressLine2} required="required" onChange={(e)=>{setAddress2(e.target.value)}}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" name="address" placeholder="Municipality" value={Municipality} required="required" onChange={(e)=>{setMunicipality(e.target.value)}}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" name="address" placeholder="Province" value={provice} required="required" onChange={(e)=>{setProvince(e.target.value)}}/>
                </div>
                <div className="form-group">
                    <label className="col-form-label col-4">BIRTHDATE</label>
                    <input type="date" className="form-control" name="username" placeholder="Birthday" required="required"/>
                </div>
                
                <div className="form-group">
                    <label className="col-form-label col-4">GENDER</label>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" id="inlineCheckboxGender" name="gender" value="Male"/>
                        <label className="form-check-label" for="inlineCheckboxGender"> Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" id="inlineCheckboxGender2" name="gender" value="Female" />
                        <label className="form-check-label" for="inlineCheckboxGender"> Female</label>
                    </div>
                </div>
            </>
            )
        }
     
        <div className="form-group">
            <label className="control-label" for="appointmentfor">Appointment to</label>
            <select id="appointmentfor" name="appointmentfor" className="form-control" onChange={e=>dropdownHandler(e.target.value)} required>
                <option value = "Dentistry">Dentistry</option>
                <option value = "General Health">General Health</option>
                <option value = "OB-Gyn">OB-Gyn</option>
                <option value = "Opthalmologist"> Ophthalmologist</option>
            </select>
        </div>

        <div className="form-group">
            <label className="control-label" for="doctorP">Select A doctor: </label>
            <select id="doctorP" name="doctorP" className="form-control" onChange={e=>dropdownChange(e.target.value)} required >
                
                {
                    DropdownDoctor && DropdownDoctor.map((val, index)=>(
                        <option value = { val[0] }> {"Dr " + dropdownName[index][1] + " " +dropdownName[index][2]} </option>
                    ))
                }
            </select>
        </div>
        
        <div className="form-group">
            <label className="control-label" for="date">Preferred Date</label>
            <input type="date"  placeholder="Preferred Date" className="form-control input-md" onChange={e=>setPreferredDate(e.target.value)}/>
        </div>
        <div className="form-group">
            <label className="control-label" for="date">Preferred Time</label>
            <input type="time"  placeholder="Preferred Time"  min="09:00" max="18:00" className="form-control input-md" onChange={e=>setPreferredTime(e.target.value)} />
        </div>
        
          <div className="form-group">
                <button className="btn btn-primary btn-lg cancelButton" onClick={cancelHandler} >Cancel</button>
                <button type="submit" className="btn btn-primary btn-lg" >Next</button>  
          </div>
           
		
    </form>
    </div>
    );
}