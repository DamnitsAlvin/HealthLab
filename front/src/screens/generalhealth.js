
import AppointmentSteps from "../components/appointmentSteps";
import {removeBasicAppointment,saveGHQuestions} from "../actions/userActions";
import {useDispatch, useSelector} from "react-redux";   
import React,{useState} from "react"; 

export default function GeneralHealthScreen(props){
    const getPatientInfo = useSelector(x=>x.appointmentRequest)
    const {saveBasicAppointment} = getPatientInfo

    const [patientInMedic, setPatientInMedic] = useState("");
    const [frequentHeadache, setFrequentHeadache] = useState("");
    const [frequentFatigue, setFrequentFatigue] = useState("");
    const [shortnessBreath, setShortnessBreath]= useState("");
    const [sleeplessNight, setSleeplessNight] = useState("");
    const [urinary ,setUrinary] = useState("");
    const [isSmoker, setIsSmoker] = useState("");
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
    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(saveGHQuestions({...saveBasicAppointment, patientInMedic, frequentHeadache, frequentFatigue, shortnessBreath, sleeplessNight, urinary, isSmoker, description}))
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
                        <label className="title" for="civilwidowed">Is the patient in current medications  </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="headache" onChange={e=>setPatientInMedic("Yes")}/> 
                            <input type="radio" className="option" name="headache"  onChange={e=>setPatientInMedic("No")}/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Experiencing frequent headaches? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="heartattack"  onChange={e=>setFrequentHeadache("Yes")}/> 
                            <input type="radio" className="option" name="heartattack" onChange={e=>setFrequentHeadache("No")}/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Experiencing fatigue? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="nh" onChange={e=>setFrequentFatigue("Yes")}/> 
                            <input type="radio" className="option" name="nh" onChange={e=>setFrequentFatigue("No")}/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Has shortness of breath ? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="cancer" onChange={e=>setShortnessBreath("Yes")}/> 
                            <input type="radio" className="option" name="cancer" onChange={e=>setShortnessBreath("No")}/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Has sleepless night? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="chest" onChange={e=>setSleeplessNight("Yes")}/> 
                            <input type="radio" className="option" name="chest" onChange={e=>setSleeplessNight("No")}/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Has urinary or fecal leakage ? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="bleed" onChange={e=>setUrinary("Yes")}/> 
                            <input type="radio" className="option" name="bleed" onChange={e=>setUrinary("No")}/>
                        </div>
                </div>


                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Is a smoker ? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="smoker" onChange={e=>setIsSmoker("Yes")}/> 
                            <input type="radio" className="option" name="smoker" onChange={e=>setIsSmoker("No")}/>
                        </div>
                </div>

                <div class="form-group">
                    <label for="exampleFormControlTextarea1">What is going on recently in your life</label>
                    <textarea class="form-control" id="textArea" rows="3" placeholder="Enter other details you want to tell the Doctor" onChange={e=>setDescription(e.target.value)}></textarea>
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