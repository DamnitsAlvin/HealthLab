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

export const BasicDoctorReducer = (state={}, action) =>{
    switch(action.type){
        case REGISTER_BASIC_DOCTOR_REQUEST:
            return {loading : true}
        case REGISTER_BASIC_DOCTOR_SUCCESS:
            return {loading : false, docBasicReg: action.payload}
        case REGISTER_BASIC_DOCTOR_FAIL:
            return {loading : false, error: action.payload}
        default: 
            return state
    }
}

export const EducDoctorReducer = (state={}, action) =>{
    switch(action.type){
        case REGISTER_EDUC_DOCTOR_REQUEST:
            return {loading : true}
        case REGISTER_EDUC_DOCTOR_SUCCESS:
            return {loading : false, docEducReg: action.payload}
        case REGISTER_EDUC_DOCTOR_FAIL:
            return {loading : false, error: action.payload}
        default: 
            return state
    }
}

export const SpecialtyDoctorReducer = (state={}, action) =>{
    switch(action.type){
        case REGISTER_SPECIALTY_DOCTOR_REQUEST:
            return {loading : true}
        case REGISTER_SPECIALTY_DOCTOR_SUCCESS:
            return {loading : false, docSpecialtyReg: action.payload}
        case REGISTER_SPECIALTY_DOCTOR_FAIL:
            return {loading : false, error: action.payload}
        default: 
            return state
    }
}