import {
    REGISTER_BASIC_DOCTOR_REQUEST,
    REGISTER_BASIC_DOCTOR_SUCCESS,
    REGISTER_BASIC_DOCTOR_FAIL,

    REGISTER_EDUC_DOCTOR_REQUEST,
    REGISTER_EDUC_DOCTOR_SUCCESS,
    REGISTER_EDUC_DOCTOR_FAIL,

    REGISTER_SPECIALTY_DOCTOR_REQUEST,
    REGISTER_SPECIALTY_DOCTOR_SUCCESS,
    REGISTER_SPECIALTY_DOCTOR_FAIL,
    GET_DOCTOR_TITLE_BASIC_REQUEST,
    GET_DOCTOR_TITLE_BASIC_SUCCESS,
    GET_DOCTOR_TITLE_BASIC_FAIL,
    UPDATE_DOC_IMAGE_SUC,
    UPDATE_DOC_IMAGE_REQ,
    UPDATE_DOC_IMAGE_FAIL,
    UPDATE_DOC_INFO_REQ,
    UPDATE_DOC_INFO_SUC,
    UPDATE_DOC_INFO_FAIL,
    GET_DOCTOR_REQ,
    GET_DOCTOR_SUC,
    GET_DOCTOR_FAIL,
    UPDATE_APPOINTMENT_STATUS_REQ,
    UPDATE_APPOINTMENT_STATUS_SUC,
    UPDATE_APPOINTMENT_STATUS_FAIL
} from "../constants/doctorConstants"
import Axios from "axios"
import axios from 'axios'
import { GET_APPOINTMENT_FAIL, GET_APPOINTMENT_SUCCESS } from "../constants/userConstants"

export const registerBasicInformationDoctor = (doctorInfo) =>async(dispatch) =>{
    dispatch({type: REGISTER_BASIC_DOCTOR_REQUEST})
    try{
        const {data} = await axios.post("http://localhost:5000/api/doctorbasicreg", doctorInfo)
        dispatch({type: REGISTER_BASIC_DOCTOR_SUCCESS, payload: data})
    }
    catch(error){
        dispatch({type: REGISTER_BASIC_DOCTOR_FAIL, 
        payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message,
        })
    }
}

export const registerEducInformationDoctor = (doctorInfo) => async(dispatch)=>{
    dispatch({type: REGISTER_EDUC_DOCTOR_REQUEST})
    try{
        const {data} = await axios.post("http://localhost:5000/api/doctoreducreg", doctorInfo)
        dispatch({type: REGISTER_EDUC_DOCTOR_SUCCESS, payload: data})
    }
    catch(error){
        dispatch({type: REGISTER_EDUC_DOCTOR_FAIL, 
        payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message,
        })
    }
}

export const registerSpecialtyInformationDoctor = (doctorInfo) => async(dispatch) =>{
    dispatch({type: REGISTER_SPECIALTY_DOCTOR_REQUEST})
    try{
        const {data} = await axios.post("http://localhost:5000/api/doctorspecialtyreg", doctorInfo)
        dispatch({type: REGISTER_SPECIALTY_DOCTOR_SUCCESS, payload: data})
    }
    catch(error){
        dispatch({type: REGISTER_SPECIALTY_DOCTOR_FAIL, 
        payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message,
        })
    }
}

export const DoctorInformation = (doctor_Id) => async(dispatch) =>{
    dispatch({type: GET_DOCTOR_TITLE_BASIC_REQUEST})
    try{
        const {data} = await axios.get(`http://localhost:5000/api/doctorInformation?doctor_id=${doctor_Id}`)
        dispatch({type: GET_DOCTOR_TITLE_BASIC_SUCCESS, payload: data})
    }
    catch(error){
        dispatch({type: GET_DOCTOR_TITLE_BASIC_FAIL, 
            payload: error.response && error.response.data.message 
            ? error.response.data.message
            : error.message,
            })
    }
}

export const UpdateImage = (datum) => async(dispatch) =>{
    dispatch({type: UPDATE_DOC_IMAGE_REQ})
    try{
        const {data} = await axios.post("http://localhost:5000/api/updateImage", datum)
        console.log("Data: ", datum)
        dispatch({type: UPDATE_DOC_IMAGE_SUC, payload: data})
    }
    catch(error){
        
        dispatch({type: UPDATE_DOC_IMAGE_FAIL, 
            payload: error.response && error.response.data.message 
            ? error.response.data.message
            : error.message,
            })
    }
}

export const updateDoctorInfo = (personal, Educ, Cert, Spec, Exp, Pay, Online, Offline, Clinic) => async(dispatch) =>{
    dispatch({type: UPDATE_DOC_INFO_REQ})
    
    try{
        const {personalData} = await axios.post("http://localhost:5000/api/doctor/update/personal", personal)
        const {educData} = await axios.post("http://localhost:5000/api/doctor/update/education", {"Ed": Educ})
        const {certData} = await axios.post("http://localhost:5000/api/doctor/update/certificate", {"Cert": Cert})
        const {SpecData} = await axios.post("http://localhost:5000/api/doctor/update/specialization", {"Spec": Spec})
        const {ExpData} = await axios.post("http://localhost:5000/api/doctor/update/experience", {"Exp": Exp})
        const {PayData} = await axios.post("http://localhost:5000/api/doctor/update/payment", {"Pay": Pay})
        const {onlineData} = await axios.post("http://localhost:5000/api/doctor/update/timeonline", {"On": Online})
        const {clinicData} = await axios.post("http://localhost:5000/api/doctor/update/clinicaddress", {"Clinic": Clinic})
        const {offlineData} = await axios.post("http://localhost:5000/api/doctor/update/timeoffline", {"Off": Offline})

        dispatch({type: UPDATE_DOC_INFO_SUC, payload: true})
    }
    catch(error){
        dispatch({type: UPDATE_DOC_INFO_FAIL, 
            payload: false
            })
    }

}

export const getDoctor = (category) => async(dispatch) =>{
    dispatch({type: GET_DOCTOR_REQ})
    try{
        const {data} = await axios.get(`http://localhost:5000/api/doctor/getdoctor?category=${category}`)
        dispatch({type: GET_DOCTOR_SUC, payload: data})
    }
    catch(error){
        dispatch({type: GET_DOCTOR_FAIL, 
            payload: error.response && error.response.data.message 
            ? error.response.data.message
            : error.message,
            })
    }
}

export const DoctorAppoinmentStatus = (id,status) => async(dispatch) =>{
    dispatch({type: UPDATE_APPOINTMENT_STATUS_REQ})
    try{
        const {data} = await axios.post("http://localhost:5000/api/setappointment", {id, status})
        dispatch({type: UPDATE_APPOINTMENT_STATUS_SUC})
    }
    catch(error){
        dispatch({type: UPDATE_APPOINTMENT_STATUS_FAIL, 
            payload: error.response && error.response.data.message 
            ? error.response.data.message
            : error.message,
            })
    }

}