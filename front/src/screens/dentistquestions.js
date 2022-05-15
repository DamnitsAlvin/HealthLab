import React , {useEffect, useState} from "react";
import AppointmentSteps from "../components/appointmentSteps";
import {removeBasicAppointment,saveDentistryCheckupRequest} from "../actions/userActions";
import {useDispatch, useSelector} from "react-redux";


export default function DentistQuestions(props){
    const getSavedPatientInfo = useSelector(x=>x.appointmentRequest);
    const {saveBasicAppointment} = getSavedPatientInfo; 
    
    const [hasMouthSore, sethasMouthSore] = useState(false); 
    const [hasJawPain, sethasJawPain] = useState(false);
    const [swollenFace, setSwollenFace] = useState(false);
    const [sensitiveTeeth, setSensitiveTeeth] = useState(false);
    const [brokenTeeth, setBrokenTeeth] = useState(false);
    const [dryMouth ,setDryMouth] = useState(false); 
    const [bleedingGums , setBleedingGums] = useState(false); 
    const [badTaste, setBadTaste] = useState(false); 
    const [isSmoker, setIsSmoker] = useState(false);
    const [description, setDescription] = useState("");
    
    const dispatch = useDispatch();

    const cancelHandler = (e)=>{
        e.preventDefault();
        props.history.push("/");
        dispatch(removeBasicAppointment());
    }
    const backHandler = (e) =>{
        e.preventDefault();
        props.history.push("/medicalCard")
    }
    const onSubmitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveDentistryCheckupRequest({...saveBasicAppointment, hasMouthSore, hasJawPain, swollenFace, sensitiveTeeth, brokenTeeth, dryMouth, bleedingGums, badTaste, isSmoker, description}));
        props.history.push("/");
    }
    return(
        <div classNameName="bodyform">
        <div className="signup-form">
            <form onSubmit={onSubmitHandler}>
               
                <h2>Appointment Request</h2>
                <p>Please fill in this form to create an appointment request!</p>
                <hr/>
                 
                <AppointmentSteps step1 step2 step3 />
                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed"></label>
                        <div className="option-header">
                            <label className="option">Yes </label>
                            <label className="option">No </label>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Has mouth sores? (singaw) </label>
                        <div className="option-header">
                            <input type="radio" className="option" name="headache" onChange={e=>sethasMouthSore(true)}  /> 
                            <input type="radio" className="option" name="headache" onChange={e=>sethasMouthSore(false)}/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Has jaw pain ? </label>
                        <div className="option-header">
                            <input type="radio" className="option" name="heartattack" onChange={e=>sethasJawPain(true)}/> 
                            <input type="radio" className="option" name="heartattack" onChange={e=>sethasJawPain(false)}/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Has swollen face or gums ? </label>
                        <div className="option-header">
                            <input type="radio" className="option" name="nh" onChange={e=>setSwollenFace(true)}/> 
                            <input type="radio" className="option" name="nh"onChange={e=>setSwollenFace(false)}/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Very sensitive teeth ? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="cancer" onChange={e=>setSensitiveTeeth(true)}/> 
                            <input type="radio" className="option" name="cancer" onChange={e=>setSensitiveTeeth(false)}/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Has broken teeth ? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="chest" onChange={e=>setBrokenTeeth(true)}/> 
                            <input type="radio" className="option" name="chest" onChange={e=>setBrokenTeeth(false)}/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Has dry mouth ? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="cough" onChange={e=>setDryMouth(true)}/> 
                            <input type="radio" className="option" name="cough" onChange={e=>setDryMouth(false)}/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Has bleeding gums ? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="bleed" onChange={e=>setBleedingGums(true)}/> 
                            <input type="radio" className="option" name="bleed" onChange={e=>setBleedingGums(false)}/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Has bad taste or breath in mouth ? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="badtaste" onChange={e=>setBadTaste(true)}/> 
                            <input type="radio" className="option" name="badtaste" onChange={e=>setBadTaste(false)} />
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Is a smoker ? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="smoker" onChange={e=>setIsSmoker(true)}/> 
                            <input type="radio" className="option" name="smoker" onChange={e=>setIsSmoker(false)} />
                        </div>
                </div>

                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Description</label>
                    <textarea class="form-control" id="textArea" rows="3" placeholder="Enter other details you want to tell the Dentist" onChange={e=>setDescription(e.target.value)}></textarea>
                </div>
        
                <div className="form-group">
                    <button className="btn btn-primary btn-lg cancelButton" onClick={cancelHandler} >Cancel</button>
                    <button className="btn btn-primary btn-lg cancelButton" onClick={backHandler} >Back</button>
                    <button type="submit" className="btn btn-primary btn-lg" >Save</button>  
                 </div>

               
            </form>
        </div>
    </div>
    );
}