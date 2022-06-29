import { UPDATE_DOC_IMAGE_FAIL, UPDATE_DOC_IMAGE_REQ, UPDATE_DOC_IMAGE_SUC } from "../constants/doctorConstants";
import { 
    GETALLDOCTOR_FAIL,
    GETALLDOCTOR_REQUEST,
    GETALLDOCTOR_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_SIGNIN_FAIL, 
    USER_SIGNIN_REQUEST, 
    USER_SIGNIN_SUCCESS,
    USER_SIGNOUT,
    SAVE_APPOINTMENT_REQUEST_1,
    REMOVE_APPOINTMENT_REQUEST,
    ADD_MEDICAL_CARD,
    ADD_DENTIST_INFO,
    GET_APPOINTMENT_REQUEST,
    GET_APPOINTMENT_SUCCESS,
    GET_APPOINTMENT_FAIL,
    CHECK_EMAIL_REQUEST,
    CHECK_EMAIL_SUCCESS,
    CHECK_EMAIL_FAIL,
    SAVE_PATIENT_DET,
    SAVE_PATIENT_SUC,
    SAVE_PATIENT_FAIL,
    SAVE_APPOINTMENT_REQUEST,
    SAVE_APPOINTMENT_SUCCESS,
    SAVE_APPOINTMENT_FAIL,
    DELETE_APPOINTMENT_REQUEST,
    DELETE_APPOINTMENT_SUCCESS,
    DELETE_APPOINTMENT_FAIL,
    GET_USER_DETAIL_REQ,
    GET_USER_DETAIL_SUC,
    GET_USER_DETAIL_FAIL, 
    UPDATE_USER_DETAIL_REQ, 
    UPDATE_USER_DETAIL_SUC,
    UPDATE_USER_DETAIL_FAIL,
} from "../constants/userConstants";



export const userSignInReducer = (state = {}, action)=>{
    switch(action.type){
        case USER_SIGNIN_REQUEST:
            return {loading:true};
          case USER_SIGNIN_SUCCESS:
              return {loading:false, userInfo: action.payload, error: false};
          case USER_SIGNIN_FAIL:
              return {loading: false, error: action.payload};
          case USER_SIGNOUT:
              return {};
          default:  
              return state;
    }
};

export const EmailCheckerReducer=(state={}, action) =>{
    switch(action.type){
        case CHECK_EMAIL_REQUEST:
            return {loading:true}
        case CHECK_EMAIL_SUCCESS:
            return {loading: false, message: action.payload}
        case CHECK_EMAIL_FAIL:
            return {loading:false, emailError: action.payload}
        default:
            return state; 
    }
}

export const userRegisterReducer=(state={}, action)=>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading:true};
        case USER_REGISTER_SUCCESS:
            return {loading: false, userReg: action.payload }
        case USER_REGISTER_FAIL:
            return {loading:false, error: action.payload}
        default: 
            return state
    }
}

export const loadDoctorsReducer=(state={}, action)=>{
    switch(action.type){
        case GETALLDOCTOR_REQUEST:
            return {loading:true}
        case GETALLDOCTOR_SUCCESS:
            return {loading:false, doctor: action.payload}
        case GETALLDOCTOR_FAIL:
            return{loading:false, error:action.payload}
        default:
            return state;
    }
}

export const appointmentRequestSlipReducer=(state={}, action)=>{
    switch(action.type){
        case SAVE_APPOINTMENT_REQUEST_1: 
            return {...state, saveBasicAppointment: action.payload}
        case REMOVE_APPOINTMENT_REQUEST:
            return {...state};
        case ADD_MEDICAL_CARD: 
            return {...state, PatientMedicalCard: action.payload};
        case ADD_DENTIST_INFO:
            return {...state, Dentist_slip: action.payload}
        case SAVE_PATIENT_DET: 
            return {...state, PatientDetail: action.payload}
        default: 
            return state;
    }
}

export const addPatientReducer = (state={}, action)=>{
    switch(action.type){
        case SAVE_PATIENT_DET: 
            return {loading: true}
        case SAVE_PATIENT_SUC:
            return {loading: false, SavePatient: "success"}
        case SAVE_PATIENT_FAIL:
            return {loading: false, SavePatient: "fail"}
        default:
            return state
    }
}

export const saveAppointmentReducer = (state={}, action) =>{
    switch(action.type){
        case SAVE_APPOINTMENT_REQUEST:
            return {loading: true}
        case SAVE_APPOINTMENT_SUCCESS: 
            return {loading: false, SaveAppointment: action.payload}
        case SAVE_APPOINTMENT_FAIL:
            return {loading:false, SaveAppointmentError: action.payload}
        case "REMOVE_APPOINTMENT_SUCCESS":
            return {SaveAppointment: false}
        default:
            return state; 
    }
}

export const getUserAppointmentReducer = (state={}, action)=>{
    switch(action.type){
        case GET_APPOINTMENT_REQUEST:
            return {loading: true}
        case GET_APPOINTMENT_SUCCESS:
            return {loading:false, appointments: action.payload}
        case GET_APPOINTMENT_FAIL:
            return {loading: false, message: action.payload}
        default:
            return state
    }
}

export const fileImageHandlerReducer = (state={}, action)=>{
    switch(action.type){
        case UPDATE_DOC_IMAGE_REQ:
            return {loading: true}
        case UPDATE_DOC_IMAGE_SUC:
            return {loading: false, FileImage: action.payload}
        case UPDATE_DOC_IMAGE_FAIL:
            return {loading:false, FileImageError: action.payload}
        default:
            return state
    }
}

export const deleteAppointmentReducer = (state={}, action) =>{
    switch(action.type){
        case DELETE_APPOINTMENT_REQUEST:
            return {Deleteloading: true}
        case DELETE_APPOINTMENT_SUCCESS:
            return {Deleteloading: false, DeleteSuccess: true, DeleteMessage: action.payload}
        case DELETE_APPOINTMENT_FAIL:
            return {DeleteLoading: false, DeleteSuccess: false}
        default:
            return state
    }

}

export const getUserDetailReducer = (state={}, action) =>{
    switch(action.type){
        case GET_USER_DETAIL_REQ:
            return {loading: true}
        case GET_USER_DETAIL_SUC:
            return {loading:false, UserDetails: action.payload}
        case GET_USER_DETAIL_FAIL:
            return {loading:false, error: action.payload}
        default:
            return state
    }
}

export const updateUserDetailReducer = (state={}, action) =>{
    switch(action.type){
        case UPDATE_USER_DETAIL_REQ:
            return {loading: true}
        case UPDATE_USER_DETAIL_SUC:
            return {loading:false, UpdateUser: true}
        case UPDATE_USER_DETAIL_FAIL:
            return {loading:false, UpdateUser: false}
        default:
            return state
    }
}