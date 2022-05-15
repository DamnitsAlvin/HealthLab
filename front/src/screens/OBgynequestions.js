
import AppointmentSteps from "../components/appointmentSteps";
import {removeBasicAppointment, saveOBQuestions} from "../actions/userActions";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";    

export default function OBquestionScreen(props){
    const getPatientInfo = useSelector(x=>x.appointmentRequest); 
    const {saveBasicAppointment} = getPatientInfo; 
    const [painfulPeriod, setPainfulPeriod] = useState("");
    const [vaginalOdor, setVaginalOdor]  = useState("");
    const [swollenBumps, setSwollenBumps] = useState("");
    const [dryness, setDryness]  = useState("");
    const [pain, setPain]  = useState("");
    const [leak, setLeak]  = useState("");
    const [lowLibido, setLowLibido]  = useState("");
    const [isSmoker, setIsSmoker]  = useState("");
    const [hasStd, setHasStd]  = useState("");
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
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveOBQuestions({...saveBasicAppointment, painfulPeriod, vaginalOdor, swollenBumps, dryness, pain, leak, lowLibido, isSmoker, hasStd, description}))
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
                        <label className="title" for="civilwidowed">Has painful periods? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="headache" onChange={e=>setPainfulPeriod("Yes")}/> 
                            <input type="radio" className="option" name="headache" onChange={e=>setPainfulPeriod("No")}/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Has vaginal odor ? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="heartattack" onChange={e=>setVaginalOdor("Yes")}/> 
                            <input type="radio" className="option" name="heartattack" onChange={e=>setVaginalOdor("No")}/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Has swollen bumps or growth ? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="nh" onChange={e=>setSwollenBumps("Yes")}/> 
                            <input type="radio" className="option" name="nh" onChange={e=>setSwollenBumps("No")}/>
                        </div>
                </div>


                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Has vaginal dryness? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="chest" onChange={e=>setDryness("Yes")}/> 
                            <input type="radio" className="option" name="chest" onChange={e=>setDryness("No")} />
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Experiencing pain during sex ? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="cough" onChange={e=>setPain("Yes")}/> 
                            <input type="radio" className="option" name="cough" onChange={e=>setPain("No")}/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Has urinary or fecal leakage ? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="bleed" onChange={e=>setLeak("Yes")}/> 
                            <input type="radio" className="option" name="bleed" onChange={e=>setLeak("No")}/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Has low libido ? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="badtaste" onChange={e=>setLowLibido("Yes")}/> 
                            <input type="radio" className="option" name="badtaste" onChange={e=>setLowLibido("No")}/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Is a smoker ? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="smoker" onChange={e=>setIsSmoker("Yes")}/> 
                            <input type="radio" className="option" name="smoker" onChange={e=>setIsSmoker("No")}/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Has/Had STD ? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="std" onChange={e=>setHasStd("Yes")}/> 
                            <input type="radio" className="option" name="std" onChange={e=>setHasStd("No")}/>
                        </div>
                </div>

                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Description</label>
                    <textarea class="form-control" id="textArea" rows="3" placeholder="Enter other details you want to tell the OB-GYN" onChange={e=>setDescription(e.target.value)}></textarea>
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