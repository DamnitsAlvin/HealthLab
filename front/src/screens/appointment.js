import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux"
import {deleteAppointment, getAppointments} from "../actions/userActions"

export default function AppointmentPage(){
    const dispatch = useDispatch()
    const getAppoint = useSelector(x=>x.userAppointment)
    const {loading, appointments, message} = getAppoint
    const delAppoint = useSelector(x=>x.deleteAppointment)

    const {DeleteSuccess} = delAppoint

    const getUser = useSelector(x=>x.userSignIn)
    const {userInfo} = getUser

   
    useEffect(()=>{
        dispatch(getAppointments(userInfo.data[0], userInfo.data[2]))
    }, [dispatch,DeleteSuccess])

    const deleteHandler = (appointId) =>{
        if(window.confirm(`Are you sure you want to delete appointment ${appointId}?`)==true){
            dispatch(deleteAppointment(appointId))
        }
  
    }
    
    return(
    <>
   
    <div className="tableform">
        <div className="table-wrapper">
            <div className="table-title">
                <div className="row">
                <div className="col-sm-6">
                    <h2>Appointment Page</h2>
                </div>
                </div>
            </div>
            {
        DeleteSuccess  && (<div className="alert alert-success">Successfully deleted</div>)
            }
            {
                userInfo.data[2] == "user" ? (
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>Appointment ID</th>
                        <th>Patient Name</th>
                        <th>Doctor Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Description</th>
                        <th>Mode</th>
                        <th>Mode</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                    </tr>
                
                    {appointments && 
                        appointments.Appointments.map((appoint)=>(
                            <tr>
                            <td>
                                {appoint[0]}
                            </td>
                            <td>{appointments.Name.find(ele => ele[0] == appoint[1])[1] + " " + appointments.Name.find(ele => ele[0] == appoint[1])[2]}</td>
                            <td>{"Dr. "+appointments.Doctor.find(ele => ele[0] == appoint[2])[1] + " " + appointments.Doctor.find(ele => ele[0] == appoint[2])[2]}</td>
                            <td>{appoint[3]}</td>
                            <td>{appoint[4]}</td>
                            <td>{appoint[5]}</td>
                            <td>{appoint[6]}</td>
                            <td>{appoint[7]}</td>
                            <td>
                                <button className="btn btn-success" >Details</button>
                                <button className="btn btn-danger" onClick={()=>deleteHandler(appoint[0])}>Delete</button>
                            </td>
                        </tr>
                            ))
                    }
                    </tbody>
                </table>

                ) : (

                    <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>Appointment ID</th>
                        <th>Patient Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Description</th>
                        <th>Mode</th>
                        <th>Mode</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                    </tr>
                   
                    {appointments && 
                        appointments.Appointments.map((appoint)=>(
                            <tr>
                            <td>
                                {appoint[0]}
                            </td>
                            <td>{appointments.Name.find(ele => ele[0] == appoint[1])[2] + " " + appointments.Name.find(ele => ele[0] == appoint[1])[3]}</td>
                            <td>{appoint[3]}</td>
                            <td>{appoint[4]}</td>
                            <td>{appoint[5]}</td>
                            <td>{appoint[6]}</td>
                            <td>{appoint[7]}</td>
                            <td>
                                <button className="btn btn-success" >Accept</button>
                                <button className="btn btn-danger" >Decline</button>
                                <button className="btn btn-warning" >Details</button>
                            </td>
                        </tr>
                            ))
                    }
                    </tbody>
                    </table>
                )

            }
            
        </div>
    </div>
    </>
    );
}