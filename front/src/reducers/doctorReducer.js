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
    GET_DOCTOR_TITLE_BASIC_FAIL
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

export const DoctorInformationReducer = (state={}, action) =>{
    switch(action.type){
        case GET_DOCTOR_TITLE_BASIC_REQUEST: 
            return {loading : true}
        case GET_DOCTOR_TITLE_BASIC_SUCCESS:
            return {loading:false, DocBasicInfo: action.payload}
        case GET_DOCTOR_TITLE_BASIC_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}