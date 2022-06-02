
import AppointmentSteps from "../components/appointmentSteps";
import {removeBasicAppointment,saveOptalQuestions} from "../actions/userActions";
import {useDispatch, useSelector} from "react-redux";   
import React, {useState} from "react"; 

export default function OptalQuestionsScreen(props){
    const getPatientInformation = useSelector(x=>x.appointmentRequest); 
    const {saveBasicAppointment} = getPatientInformation;
    const [eyestrain ,setEyestrain] = useState("");
    const [dryeyes, setDryeyes] = useState("");
    const [irritated, setIrritated] = useState("");
    const [itchy ,setItchy] = useState("");
    const [fluctuating ,setFluctuating] = useState("");
    const [headache, setHeadache] = useState("");
    const [redeye, setredeye] = useState("");
    const [trouble, setTrouble]= useState("");
    const [gadget, setGadget]= useState("");
    const [glare, setGlare] = useState("");
    const [description, setDescription]= useState("");
   

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
    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(saveOptalQuestions({...saveBasicAppointment,eyestrain, dryeyes,irritated,itchy,fluctuating, headache, redeye, trouble, gadget, glare,description }));
        props.history.push("/")
        
    }
    return(
        <div classNameName="bodyform">
        <div className="signup-form">
            <form onSubmit={submitHandler}>
               
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
                        <label className="title" for="civilwidowed">Has eyestrain? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="headache" onChange={e=>setEyestrain(true)}/> 
                            <input type="radio" className="option" name="headache" onChange={e=>setEyestrain(false)}/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Has dry eyes ? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="heartattack" onChange={e=>setDryeyes(true)}/> 
                            <input type="radio" className="option" name="heartattack" onChange={e=>setDryeyes(false)}/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Has irritated eyes ? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="nh" onChange={e=>setIrritated(true)}/> 
                            <input type="radio" className="option" name="nh" onChange={e=>setIrritated(false)}/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Very itchy eyes ? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="cancer" onChange={e=>setItchy(true)}/> 
                            <input type="radio" className="option" name="cancer" onChange={e=>setItchy(false)}/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Has fluctuating vision? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="chest" onChange={e=>setFluctuating(true)}/> 
                            <input type="radio" className="option" name="chest" onChange={e=>setFluctuating(false)}/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Has frequently headaches ? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="cough" onChange={e=>setHeadache(true)}/> 
                            <input type="radio" className="option" name="cough" onChange={e=>setHeadache(false)}/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Has red eyes ? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="bleed" onChange={e=>setredeye(true)}/> 
                            <input type="radio" className="option" name="bleed" onChange={e=>setredeye(false)}/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Has trouble reading signs that are far from you ? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="badtaste" onChange={e=>setTrouble(true)}/> 
                            <input type="radio" className="option" name="badtaste" onChange={e=>setTrouble(false)}/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Uses a gadget for more than 8 hours a day? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="smoker" onChange={e=>setGadget(true)}/> 
                            <input type="radio" className="option" name="smoker" onChange={e=>setGadget(false)}/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Is seeing glare from oncoming headlights at night? ? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="std" onChange={e=>setGlare(true)}/> 
                            <input type="radio" className="option" name="std" onChange={e=>setGlare(false)}/>
                        </div>
                </div>

                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Description</label>
                    <textarea class="form-control" id="textArea" rows="3" placeholder="Enter other details you want to tell the Ophthalmologist" onChange={e=>setDescription(e.target.value)}></textarea>
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