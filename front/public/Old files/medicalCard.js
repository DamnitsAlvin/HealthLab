import React, {useState} from "react";
import {removeBasicAppointment, addMedicalCard} from "../actions/userActions";
import {useDispatch, useSelector} from "react-redux";
import AppointmentSteps from "../components/appointmentSteps";


export default function MedicalCardScreen(props){
    const [MedicalCard, setMedicalCard] = useState("");
    const [MedicalCardNumber, setMedicalCardNumber] = useState("");
    const getPatientInfo = useSelector(x=>x.appointmentRequest); 
    const { saveBasicAppointment } = getPatientInfo;
    const dispatch = useDispatch();
    const cancelHandler = (e)=>{
        e.preventDefault();
        props.history.push("/");
        dispatch(removeBasicAppointment());
    }
    const backHandler = (e) =>{
        e.preventDefault();
        props.history.push("/createAppointment")
    }
    const onSubmitHandler = (e) =>{
        e.preventDefault();
        dispatch(addMedicalCard({MedicalCard, MedicalCardNumber}))
        if(saveBasicAppointment.ServiceType === "Dentistry"){
            props.history.push("/dentistryquestions");
        }
        else if(saveBasicAppointment.ServiceType === "General Health"){
            props.history.push("/generalHealthquestions");
        }
        else if(saveBasicAppointment.ServiceType === "OB-Gyn"){
            props.history.push("/obgynequestions");
        }
        else{
            props.history.push("/optalquestions")
        }
        
    }
    return(
        <div className="signup-form">
        <form onSubmit={onSubmitHandler}>
            <h2>Appointment Request</h2>
            <p>Please fill in this form to create an appointment request!</p>
            <hr/>
            <AppointmentSteps step1 step2/>

            <div class="form-group">
                <label class="control-label" for="appointmentfor">Medical Card</label>
                <select id="appointmentfor" name="appointmentfor" class="form-control" onChange={e=>setMedicalCard(e.target.value)} required>
                    <option value = "PhilHealth">PhilHealth</option>
                    <option value = "MediCard">MediCard</option>
                    <option value = "PhilCare">PhilCare</option>
                    <option value = "MaxiCare">MaxiCare</option>
                    <option value = "None">None</option>
                    <option value = "Other">Other</option>
                </select>
            </div>
            {MedicalCard === "Other" && (
                <div class="form-group">
                    <label className="title" for="appointmentfor" onChange={e => setMedicalCard(e.target.value)}>Please specify your HMO provider</label>
                    <input className="form-control" type="text" placeholder="HMO name" />
                </div>
            )}
            <div class="form-group">
                <label className="title" for="appointmentfor">Reference Number</label>
                <input className="form-control" type="text" placeholder="Enter Card Reference Number" onChange={e => setMedicalCardNumber(e.target.value)}/>
            </div>

            <div className="form-group">
                <button className="btn btn-primary btn-lg cancelButton" onClick={cancelHandler} >Cancel</button>
                <button className="btn btn-primary btn-lg cancelButton" onClick={backHandler} >Back</button>
                <button type="submit" className="btn btn-primary btn-lg" >Next</button>  
            </div>
            <div className="hint-text">Please select NONE if you dont have a medical card</div>
        </form>
        </div>
    );
}