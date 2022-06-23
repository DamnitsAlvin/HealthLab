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
    UPDATE_DOC_INFO_REQ,
    UPDATE_DOC_IMAGE_SUC,
    UPDATE_DOC_INFO_FAIL,
    UPDATE_DOC_INFO_SUC,
    GET_DOCTOR_REQ,
    GET_DOCTOR_SUC,
    GET_DOCTOR_FAIL,
    UPDATE_APPOINTMENT_STATUS_REQ,
    UPDATE_APPOINTMENT_STATUS_SUC,
    UPDATE_APPOINTMENT_STATUS_FAIL
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

export const DoctorUpdateReducer = (state={}, action) =>{
    switch(action.type){
        case UPDATE_DOC_INFO_REQ:
            return {Updateloading: true}
        case UPDATE_DOC_INFO_SUC:
            return {Updateloading: false, success: true}
        case UPDATE_DOC_INFO_FAIL: 
            return {Updateloading: false, success: false}
        default: 
            return state
    }
}

export const getDoctorReducer = (state={}, action)=>{
    switch(action.type){
        case GET_DOCTOR_REQ:
            return {doctorLoading: true}
        case GET_DOCTOR_SUC:
            return {doctorLoading: false, doctors: action.payload}
        case GET_DOCTOR_FAIL: 
            return {doctorLoading: false, error: action.payload}
        default: 
             return state
    }
}

export const doctorAppointmentReducer = (state={}, action) =>{
    switch(action.type){
        case UPDATE_APPOINTMENT_STATUS_REQ:
            return {loading: true}
        case UPDATE_APPOINTMENT_STATUS_SUC:
            return {loading: false, setAppointsuccess: true}
        case UPDATE_APPOINTMENT_STATUS_FAIL:
            return {loading: false, setAppointsuccess: false}
        default:
            return state
    }
}