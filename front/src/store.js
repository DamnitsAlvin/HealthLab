import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from "redux-thunk";
import { loadDoctorsReducer, userRegisterReducer, userSignInReducer, appointmentRequestSlipReducer, getUserAppointmentReducer} from "./reducers/userReducer"
import { BasicDoctorReducer, SpecialtyDoctorReducer, EducDoctorReducer } from './reducers/doctorReducer';

const initialState={
    userSignIn:{
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    },
    appointmentRequest:{
        saveBasicAppointment: localStorage.getItem("Patient_Information") ? JSON.parse(localStorage.getItem("Patient_Information")) : null,
        Dentist_slip: localStorage.getItem("Patient_description") ? localStorage.getItem("Patient_description"): null,
    }
    
    // doctorBasicRegister:{
    //     loading:"", 
    //     docBasicReg: [], 
    //     error, 
    // }
    // loadDoctor:{
    //     loading:"", 
    //     error: "", 
    //     doctor:""
    // }

    // userAppointment:{
    //     loading:,
    //     appointments:,
    //     message:, 
    // }



}

const reducer = combineReducers({

    userSignIn:userSignInReducer,
    userReg: userRegisterReducer,
    loadDoctor: loadDoctorsReducer, 
    appointmentRequest: appointmentRequestSlipReducer, 
    userAppointment: getUserAppointmentReducer,

    doctorBasicRegister: BasicDoctorReducer, 
    doctorSpecialtyRegist: SpecialtyDoctorReducer, 
    doctorEducRegist: EducDoctorReducer

})

const composeEnchance = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 
const store = createStore(reducer,initialState, composeEnchance(applyMiddleware(thunk)))
export default store;