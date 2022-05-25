import {
    REGISTER_BASIC_DOCTOR_REQUEST,
    REGISTER_BASIC_DOCTOR_SUCCESS,
    REGISTER_BASIC_DOCTOR_FAIL,

    REGISTER_EDUC_DOCTOR_REQUEST,
    REGISTER_EDUC_DOCTOR_SUCCESS,
    REGISTER_EDUC_DOCTOR_FAIL,

    REGISTER_SPECIALTY_DOCTOR_REQUEST,
    REGISTER_SPECIALTY_DOCTOR_SUCCESS,
    REGISTER_SPECIALTY_DOCTOR_FAIL
} from "../constants/doctorConstants"
import Axios from "axios"
import axios from 'axios'

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