import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { DoctorAppoinmentStatus } from "../actions/doctorActions";
import { deleteAppointment, getAppointments } from "../actions/userActions"
import { useNavigate } from 'react-router-dom'
import QRCode from 'qrcode'

export default function DeclinedAppointment(){
    const [appointID, setappointID] = useState(0)

    useEffect(() => {
        dispatch(getAppointments(userInfo.data[0], userInfo.data[2]))
    }, [dispatch, setAppointsuccess])

    const setAppoint = useSelector(x => x.setAppointmentMode)
    const { setAppointsuccess } = setAppoint

    const getAppoint = useSelector(x => x.userAppointment)
    const { appointments, message } = getAppoint
    const navigate = useNavigate()

    
    const getUser = useSelector(x => x.userSignIn)
    const { userInfo } = getUser

    const [src, setSrc] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAppointments(userInfo.data[0], userInfo.data[2]))
    }, [dispatch, setAppointsuccess])

    return(
        <>
    <div className="tableform">
        <div className="tableContainer">
     <div className="table-wrapper">
        <div className="table-title">
            <div className="row">
                <div className="col-sm-6">
                    <div className="container-fluid">
                        <h2>Declined Appointment</h2>
                    </div>
                </div>
            </div>
        </div>

        <table className="table table-striped table-hover">
            <thead>
                <tr className="carbonLeody">
                    <th>ID</th>
                    <th>Patient Name</th>
                    <th>Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                </tr>
                {appointments && appointments.Appointments &&
                    appointments.Appointments.map((appoint, index) => (
                        appoint[5] == "Declined" && (
                            <tr key={index}>
                                <td>
                                    <a href={`/invoice?appointID=${appoint[0]}&email=${appointments.Email.find(el => el[0] == appoint[1])[1]}`}> {appoint[0]} </a>
                                </td>
                                <td>{appointments.Name.find(ele => ele[0] == appoint[1])[2] + " " + appointments.Name.find(ele => ele[0] == appoint[1])[3]}</td>
                                <td>{appoint[3]}</td>
                                {appoint[5] == "Accepted" ? (
                                    <td className="alert alert-success">
                                        {appoint[5]}
                                    </td>) : appoint[5] == "Declined" ? (
                                        <td className="alert alert-danger">
                                            {appoint[5]}
                                        </td>
                                    ) :
                                    (
                                        <td className="alert alert-warning">
                                            On-queue
                                        </td>
                                    )
                                }
                            </tr>
                        )
                    ))
                }
            </tbody>
        </table>
    </div>
    </div></div>
    
    </>
    )
}