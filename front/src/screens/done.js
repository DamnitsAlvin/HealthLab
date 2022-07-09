import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { DoctorAppoinmentStatus } from "../actions/doctorActions";
import { deleteAppointment, getAppointments } from "../actions/userActions"
import { useNavigate } from 'react-router-dom'
import QRCode from 'qrcode'
import axios from "axios";

export default function DoneAppointment(){
    const [appointID, setappointID] = useState(0)
    const [userId, setID] = useState()
    const [reason, setreason] = useState("")
    const [gg, setGG] = useState(false)

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

    const clickView = (id, patient, doctor, date, time, status, desciption, mode) => {
        console.log("called")
        QRCode.toDataURL(`http://localhost:3000/invoice?appointID=${id}`).then((setSrc));
    }

    const reportUser = async() =>{
        const {status, data} = await axios.post(`http://localhost:5000/api/reportuser`, {
        'reason': reason, 
        "id": userId, 
        "app_id": appointID,
        "doc_id": userInfo.data[0]
    })
        if(status==200){
            setGG(true)
            setTimeout(()=>{
                window.location.reload(true)
            },3000)
        }
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
                <div className="col-sm-6">
                    <div className="container-fluid">
                        <h2>Done Appointments</h2>
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
                    <th>Time</th>
                    <th>Queue</th>
                    <th>Status</th>


                    <th>QR</th>
                    <th>Actions</th>

                </tr>
            </thead>
            <tbody>
                <tr>
                {
                    gg ? (
                        <div className="alert alert-success">User was reported</div>
                    ):(null)
                }
                </tr>
               
                {appointments && appointments.Appointments &&
                    appointments.Appointments.map((appoint, index) => (
                        appoint[5].length > 0 && appoint[5] == "Done" && (
                            <tr key={index}>
                                <td>
                                    <a href={`/invoice?appointID=${appoint[0]}&email=${appointments.Email.find(el => el[0] == appoint[1])[1]}`}> {appoint[0]} </a>
                                </td>
                                <td>{appointments.Name.find(ele => ele[0] == appoint[1])[2] + " " + appointments.Name.find(ele => ele[0] == appoint[1])[3]}</td>
                                <td>{appoint[3]}</td>
                                <td>{appoint[4]}</td>
                                <td>{appoint[9]}</td>
                                {appoint[5] == "Accepted" ? (
                                    <td className="alert alert-success">
                                        {appoint[5]}
                                    </td>) : appoint[5] == "Declined" ? (
                                        <td className="alert alert-danger">
                                            {appoint[5]}
                                        </td>
                                    ) : appoint[5] == "Done" ? (
                                        <td className="alert alert-success">
                                            {appoint[5]}
                                        </td>
                                    ) :
                                    (
                                        <td className="alert alert-warning">
                                            On-queue
                                        </td>
                                    )
                                }

                                <td>
                                   
                                    <button className="btn btn-warning" id="buttonQr" data-toggle="modal" data-target="#exampleModal" onClick={() => clickView(appoint[0])}>View</button>
                                   
                                       
                                   
                                   
                                </td>
                                <td>
                                {
                                !appoint[10] ? (
                                            <button className="btn btn-danger" id="buttonReport" data-toggle="modal" data-target="#reportuser" onClick={() => {setID(appoint[1]); setappointID(appoint[0])}} >Report</button>
                                        ): (null)
                                    }
                                </td>
                            </tr>
                        )
                    ))
                }
            </tbody>
        </table>
    </div>

    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Appointment Details</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="qr-container" >
                        <img className="samplepic" src={src} alt="signinbackground" />
                    </div>
                    <div className="downloadPDFile">

                        <button type="button" className="btn btn-primary" id="downloadPDF"><i className="fa-solid fa-file-pdf" id="pdfLogo"></i>Download File</button>

                    </div></div>
                <div className="modal-footer">
                    <button className="btn btn-danger" id="pepeButo" data-dismiss="modal" aria-label="Close"><i className="fa-solid fa-xmark" id="closeShit"></i> Close</button>
                </div>
            </div>
        </div>
    </div>

    <div className="modal fade" id="reportuser" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="reject">Report User</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p>Are you sure you want to report this user?</p>
                    <textarea onChange={(e)=>setreason(e.target.value)}/>
                    
                </div>
                <div className="modal-footer">
                    <button className="btn btn-warning" id="pepeButo" data-dismiss="modal" aria-label="Close" onClick={reportUser}><i className="fa-solid fa-circle-check"></i> Report</button>
                    <button className="btn btn-danger" id="pepeButo" data-dismiss="modal" aria-label="Close"><i className="fa-solid fa-xmark" id="closeShit"></i> Close</button>
                </div>
            </div>
        </div>
    </div>

    
    </div></div>
    
    </>
    )
}