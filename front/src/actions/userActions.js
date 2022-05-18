import {
    USER_SIGNIN_FAIL,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_REQUEST, 
    USER_SIGNOUT, 
    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS, 
    USER_REGISTER_FAIL,
    GETALLDOCTOR_REQUEST,
    GETALLDOCTOR_FAIL,
    GETALLDOCTOR_SUCCESS,
    SAVE_APPOINTMENT_REQUEST_1,
    REMOVE_APPOINTMENT_REQUEST, 
    ADD_MEDICAL_CARD, 
    REMOVE_MEDICAL_CARD,
    ADD_DENTIST_INFO,
    SAVE_APPOINTMENT_REQUEST,
    SAVE_APPOINTMENT_SUCCESS,
    SAVE_APPOINTMENT_ERROR,
    GET_APPOINTMENT_REQUEST,
    GET_APPOINTMENT_FAIL,
    GET_APPOINTMENT_SUCCESS

} from "../constants/userConstants";
import Axios from "axios";

export const usersignin = (ID,password, userType) => async(dispatch) =>{
    dispatch({type:USER_SIGNIN_REQUEST})
    try{
        const {data} = await Axios.post("http://localhost:5000/api/usersauth", {ID, password,userType} );
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data})      
        localStorage.setItem("userInfo", JSON.stringify(data))  
        
    }catch(error){
        dispatch({type:USER_SIGNIN_FAIL, 
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,  
        });
    }
}

export const signout=()=> (dispatch)=> {
    localStorage.removeItem("userInfo"); 
    dispatch({type: USER_SIGNOUT})
}

export const register = (User_id,First_name,Last_name,Middle_name, Suffix, Birthday, Gender, Address_line1, Address_line2, Municipality, Province, Civil_status, Phone_number, Email,password) => async(dispatch) =>{
    const params = {
        method: "POST", 
        headers:{
            "Content-type": "application/json", 
        },
        body: JSON.stringify({
            "username": User_id,
            "firstname": First_name,
            "lastname": Last_name,
            "middlename": Middle_name,
            "suffix":Suffix,
            "birthday":Birthday,
            "gender":Gender,
            "address1":Address_line1,
            "address2":Address_line2,
            "municipality":Municipality,
            "province":Province,
            "civil_status":Civil_status,
            "contact_num":Phone_number,
            "email": Email,
            "password": password
        })
    }
    dispatch({type:USER_REGISTER_REQUEST });
    try{
        const resp = await fetch("http://localhost:5000/api/userreg", params);
        const data = await resp.json();
        if (resp.status !== 200){
            dispatch({type:USER_REGISTER_FAIL, payload:data })
        }
        dispatch({type:USER_REGISTER_SUCCESS, payload:data })
        localStorage.setItem("currentUser", User_id);
    }
    catch(error){
        console.log(error)
    }
}

export const displayalldoctor = (par) => async(dispatch)=>{
    const params ={
        method:"POST", 
        mode: 'cors',
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({
            "category": par
        })
        }
    dispatch({type: GETALLDOCTOR_REQUEST});

    try{
        const resp = await fetch("http://localhost:5000/api/getalldoctor",params) 
        const data = await resp.json();
        if (resp.status !==200){
            dispatch({
                type: GETALLDOCTOR_FAIL, 
                payload: data
            })
            return false
        }
       
        dispatch({type: GETALLDOCTOR_SUCCESS, payload: data});
        return true;
    }
    catch(error){
        return false
    }
}

export const userBasicAppointment = (data) => (dispatch) =>{
    dispatch({type: SAVE_APPOINTMENT_REQUEST_1, payload:data})
    localStorage.setItem("Patient_Information",JSON.stringify(data));
}
export const removeBasicAppointment = () => (dispatch) =>{
    dispatch({type:REMOVE_APPOINTMENT_REQUEST, payload: []})
    dispatch({type:REMOVE_MEDICAL_CARD, payload: []})
    localStorage.removeItem("Patient_Information"); 
    localStorage.removeItem("Patient_Medical_Card");
}
export const addMedicalCard = (data) => (dispatch) =>{
    dispatch({type: ADD_MEDICAL_CARD, payload: data})
    localStorage.setItem("Patient_Medical_Card", JSON.stringify(data));
}
export const saveDentistryCheckupRequest = (data) => async(dispatch) =>{
    const params = {
        method: "POST", 
        headers:{
            "Content-type": "application/json", 
        },
        body: JSON.stringify({
          "appointmentId": data.appointmentRequest,
            "ID": data.id,
           "doctorId": "2348450",
           "appointmentDate": data.PreferredDate,
           "appointmentTime": data.PreferredTime,
           "specialty":"Dentistry",
          "hasMouthSore":data.hasMouthSore,
           "hasJawPain":data.hasJawPain,
           "hasSwollenFace":data.swollenFace,
           "hasSensitiveTeeth":data.sensitiveTeeth,
           "hasBrokenTeeth":data.brokenTeeth,
           "hasDryMouth":data.dryMouth,
          "hasBleedingGums":data.bleedingGums,
           "hasBadTaste":data.badTaste,
          "isSmoker":data.isSmoker,
           "description": data.description
        })
    }
    dispatch({type:SAVE_APPOINTMENT_REQUEST})

    try{
        const response = await fetch("http://localhost:5000/api/postAppointment", params)
        const data  = await response.json();
        if(response.status !==200){
            dispatch({
                type: SAVE_APPOINTMENT_ERROR, 
                payload: data
            })
        }
        dispatch({type: SAVE_APPOINTMENT_SUCCESS, payload: data});
    }catch(error){
        return false;
    }

    dispatch({type:REMOVE_APPOINTMENT_REQUEST, payload: []})
    dispatch({type:REMOVE_MEDICAL_CARD, payload: []})
    localStorage.removeItem("Patient_Information"); 
    localStorage.removeItem("Patient_Medical_Card");
}

export const saveOptalQuestions = (data) => async(dispatch)=>{
    const params = {
        method: "POST", 
        headers:{
            "Content-type": "application/json", 
        }, 
        body: JSON.stringify({
            "appointmentId": data.appointmentRequest,
              "ID": data.id,
             "doctorId": "2348450",
             "appointmentDate": data.PreferredDate,
             "appointmentTime": data.PreferredTime,
             "specialty":"Opthalmologist",
             "hasEyeStrain": data.eyestrain, 
             "hasDryEyes": data.dryeyes,
             "hasIrritatedEyes": data.irritated, 
             "hasItchyEyes":data.itchy, 
             "hasFluctuatingVision":data.fluctuating, 
             "hasFrequentHeadache":data.headache, 
             "hasRedEyes":data.redeye,
             "hasTrouble":data.trouble,
             "usingGadget":data.gadget, 
             "seeingGlare" :data.glare, 
             "description" :data.description
          })
    }

    try{
        dispatch({type: SAVE_APPOINTMENT_REQUEST})
        const resp = await fetch("http://localhost:5000/api/postAppointment", params); 
        const data = resp.json();
        if(resp.status !== 200){
            dispatch({
                type: SAVE_APPOINTMENT_ERROR, 
                payload: data
            })
        }
        dispatch({type: SAVE_APPOINTMENT_SUCCESS, payload: data});
    }catch(error){
        return false;
    }
    dispatch({type:REMOVE_APPOINTMENT_REQUEST, payload: []})
    dispatch({type:REMOVE_MEDICAL_CARD, payload: []})
    localStorage.removeItem("Patient_Information"); 
    localStorage.removeItem("Patient_Medical_Card");
}

export const saveOBQuestions = (data) => async(dispatch)=>{
    const params = {
        method: "POST", 
        headers:{
            "Content-type": "application/json", 
        }, 
        body: JSON.stringify({
            "appointmentId": data.appointmentRequest,
              "ID": data.id,
             "doctorId": "2348450",
             "appointmentDate": data.PreferredDate,
             "appointmentTime": data.PreferredTime,
             "specialty":"Ob-Gyn",
            "hasPainfulPeriods": data.painfulPeriod, 
            "hasVaginalOdor" :data.vaginalOdor,
            "hasSwollenBumps":  data.swollenBumps,
            "hasVaginalDryness":  data.dryness, 
            "hasPain": data.pain,   
            "hasUrinaryLeak": data.leak, 
            "hasLowLibido": data.lowLibido,  
            "isASmoker": data.isSmoker,
            "hasSTD" : data.hasStd, 
             "description" :data.description
          })
    }

    try{
        dispatch({type: SAVE_APPOINTMENT_REQUEST})
        const resp = await fetch("http://localhost:5000/api/postAppointment", params); 
        const data = resp.json();
        if(resp.status !== 200){
            dispatch({
                type: SAVE_APPOINTMENT_ERROR, 
                payload: data
            })
        }
        dispatch({type: SAVE_APPOINTMENT_SUCCESS, payload: data});
    }catch(error){
        return false;
    }
    dispatch({type:REMOVE_APPOINTMENT_REQUEST, payload: []})
    dispatch({type:REMOVE_MEDICAL_CARD, payload: []})
    localStorage.removeItem("Patient_Information"); 
    localStorage.removeItem("Patient_Medical_Card");
}

export const saveGHQuestions = (data) => async(dispatch)=>{
    const params = {
        method: "POST", 
        headers:{
            "Content-type": "application/json", 
        }, 
        body: JSON.stringify({
            "appointmentId": data.appointmentRequest,
              "ID": data.id,
             "doctorId": "2348450",
             "appointmentDate": data.PreferredDate,
             "appointmentTime": data.PreferredTime,
             "specialty":"General Health",
             "patientInCur": data.patientInMedic,  
             "frequentHeadache": data.frequentHeadache,  
             "fatigue":data.frequentFatigue,  
             "shortness":data.shortnessBreath, 
             "sleepless":data.sleeplessNight, 
             "urinary":data.urinary,
             "isSmoker":data.isSmoker, 
             "description" :data.description
          })
    }

    try{
        dispatch({type: SAVE_APPOINTMENT_REQUEST})
        const resp = await fetch("http://localhost:5000/api/postAppointment", params); 
        const data = resp.json();
        if(resp.status !== 200){
            dispatch({
                type: SAVE_APPOINTMENT_ERROR, 
                payload: data
            })
        }
        dispatch({type: SAVE_APPOINTMENT_SUCCESS, payload: data});
    }catch(error){
        return false;
    }
    dispatch({type:REMOVE_APPOINTMENT_REQUEST, payload: []})
    dispatch({type:REMOVE_MEDICAL_CARD, payload: []})
    localStorage.removeItem("Patient_Information"); 
    localStorage.removeItem("Patient_Medical_Card");
}
export const getAppointments = (id) => async(dispatch) => {
    dispatch({type: GET_APPOINTMENT_REQUEST})
    try{
        const params = {
            method:"POST", 
            mode: 'cors',
            headers:{
                "Content-type":"application/json"
            },
            body: JSON.stringify({
                "User_id": id, 
            })
        }
        const resp = await fetch("http://localhost:5000/api/getAppointment", params)
        const data = await resp.json() 
        if (resp.status !== 200){
            dispatch({
                type: GET_APPOINTMENT_FAIL, 
                payload: data
            })
        }
        dispatch({type: GET_APPOINTMENT_SUCCESS, payload:data})

    }catch(error){
        return false 
    }
}