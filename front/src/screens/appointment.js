import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux"
import {getAppointments} from "../actions/userActions"

export default function AppointmentPage(){
    const dispatch = useDispatch()
    const getAppoint = useSelector(x=>x.userAppointment)
    const {loading, appointments, message} = getAppoint

    const getUser = useSelector(x=>x.userSignIn)
    const {userInfo} = getUser
    if(userInfo){
        console.log(userInfo.data[0])
    }
    if(appointments){
        console.log("appointments: ", appointments)
    }
    useEffect(()=>{
        console.log("dispatch!")
        dispatch(getAppointments(userInfo.data[0]))
        console.log("called here")
    }, [dispatch])
    
    return(
    <div className="tableform">
        <div className="table-wrapper">
            <div className="table-title">
                <div className="row">
                <div className="col-sm-6">
                    <h2>Appointment Page</h2>
                </div>
                </div>
            </div>
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th>Appointment ID</th>
                    <th>Patient ID</th>
                    <th>Doctor ID</th>
                    <th>Field</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Mode</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                </tr>
               
                {appointments && 
                    appointments.data.map((appoint)=>(
                        <tr>
                        <td>
                            {appoint[0]}
                        </td>
                        <td>{appoint[1]}</td>
                        <td>{appoint[2]}</td>
                        <td>{appoint[6]}</td>
                        <td>{appoint[3]}</td>
                        <td>{appoint[4]}</td>
                        <td>{appoint[5]}</td>
                        <td>ex MODE</td>
                        <td>
                            <button>Details</button>
                            <button>Delete</button>
                            <button>Edit</button>
                        </td>
                    </tr>
                        ))
                }
                </tbody>
            </table>
        </div>
    </div>
    );
}