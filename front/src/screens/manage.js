import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { DoctorAppoinmentStatus } from "../actions/doctorActions";
import { deleteAppointment, getAppointments } from "../actions/userActions"
import { useNavigate } from 'react-router-dom'
import QRCode from 'qrcode'
import axios from "axios";
const stripe = require('stripe')('');


export default function ManageAppointment(){
    const [appointID, setappointID] = useState(0)

    const setAppoint = useSelector(x => x.setAppointmentMode)
    const { setAppointsuccess } = setAppoint

    const getAppoint = useSelector(x => x.userAppointment)
    const { appointments, message } = getAppoint
    const [receiptId, setreceiptId] = useState()
    const navigate = useNavigate()
    console.log("Receipt ID: ", receiptId)
    
    const getUser = useSelector(x => x.userSignIn)
    const { userInfo } = getUser

    const [src, setSrc] = useState("")
    const dispatch = useDispatch()

    const doctorActionHandler = async(id, mode) => {
        if(mode=="Declined"){
            /*Refunding logic */
            console.log("If Declined")
            const response = await axios.post("http://localhost:4000/refund", {charge: receiptId})
            console.log(response)
        }
        dispatch(DoctorAppoinmentStatus(id, mode))
    }

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
                <div class="col-sm-6 p-0 flex justify-content-lg-start justify-content-center">
                    <h2 class="ml-lg-2">Manage Appointment</h2>
                </div>
                <div class="col-sm-6 p-0 flex justify-content-lg-end justify-content-center">
                    <a href="#" class="btn btn-success" data-toggle="modal">
                        <span onClick={() => navigate("/calendar")}>Visit Schedule</span>
                    </a>
                </div>
            </div>
        </div>
        <table className="table table-striped table-hover">
            
            <thead>
                <tr className="carbonLeody">
                    <th>ID</th>
                    <th>Patient Name</th>
                    <th>Date</th>
                    
                    <th>Time</th>
                    <th>Status</th>
                    <th>Description</th>

                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                </tr>
                {appointments && appointments.Appointments &&
                    appointments.Appointments.map((appoint, index) => (
                        !appoint[5].length > 0 && appoint[11] == 1 && (
                            <tr key={index}>
                                <td>
                                    <a href={`/invoice?appointID=${appoint[0]}&email=${appointments.Email.find(el => el[0] == appoint[1])[1]}`}> {appoint[0]} </a>
                                </td>
                                <td>{appointments.Name.find(ele => ele[0] == appoint[1])[2] + " " + appointments.Name.find(ele => ele[0] == appoint[1])[3]}</td>
                                <td>{appoint[3]}</td>
                                <td>{appoint[4]}</td>
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

                                <td>{appoint[6]}</td>
                                <td className="pepeFlex">
                                    <button className="btn btn-success" id="pepeButton" data-toggle="modal" data-target="#viewModal" onClick={() => {setappointID(appoint[0]); 
                                                                                                                                                    setreceiptId(appoint[12])}}><i className="fa-solid fa-circle-check"></i></button>
                                    <button className="btn btn-danger" id="pepeButo" data-toggle="modal" data-target="#rejectModal"onClick={() => {setappointID(appoint[0]); 
                                                                                                                                                    setreceiptId(appoint[12])}}><i className="fa-solid fa-rectangle-xmark"></i></button>
                                </td>
                            </tr>
                        )
                    ))
                }
            </tbody>
        </table>
    </div>

    <div className="modal fade" id="viewModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="viewModal">Manage Appointment</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p>Are you sure you want to accept the requested appointment?</p>

                </div>
                <div className="modal-footer">
                    <button className="btn btn-success" id="pepeButo" data-dismiss="modal" aria-label="Close" onClick={() => doctorActionHandler(appointID, "Accepted")}><i className="fa-solid fa-circle-check"></i> Accept</button>
                    <button className="btn btn-danger" id="pepeButo" data-dismiss="modal" aria-label="Close" ><i className="fa-solid fa-xmark" id="closeShit"></i> Close</button>
                </div>
            </div>
        </div>
    </div>
    {/*MODAL ACCEPT*/}

    {/*MODAL REJECT*/}
    <div className="modal fade" id="rejectModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="reject">Manage Appointment</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p>Are you sure you want to reject this user?</p>

                </div>
                <div className="modal-footer">
                    <button className="btn btn-warning" id="pepeButo" data-dismiss="modal" aria-label="Close" onClick={() => doctorActionHandler(appointID, "Declined")}><i className="fa-solid fa-circle-check"></i> Reject</button>
                    <button className="btn btn-danger" id="pepeButo" data-dismiss="modal" aria-label="Close"><i className="fa-solid fa-xmark" id="closeShit"></i> Close</button>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>
    </>
    )
}