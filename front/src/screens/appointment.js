import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { DoctorAppoinmentStatus } from "../actions/doctorActions";
import { deleteAppointment, getAppointments } from "../actions/userActions"
import QRCode from 'qrcode'

export default function AppointmentPage() {
    const dispatch = useDispatch()
    const getAppoint = useSelector(x => x.userAppointment)
    const { loading, appointments, message } = getAppoint
    const delAppoint = useSelector(x => x.deleteAppointment)
    const setAppoint = useSelector(x => x.setAppointmentMode)
    const {setAppointsuccess} = setAppoint

    const { DeleteSuccess } = delAppoint

    const getUser = useSelector(x => x.userSignIn)
    const { userInfo } = getUser
    const [src, setSrc] = useState("")


    useEffect(() => {
        dispatch(getAppointments(userInfo.data[0], userInfo.data[2]))
    }, [dispatch, DeleteSuccess, setAppointsuccess])

    const deleteHandler = (appointId) => {
        if (window.confirm(`Are you sure you want to delete appointment ${appointId}?`) == true) {
            dispatch(deleteAppointment(appointId))
        }
    }
    const doctorActionHandler = (id, mode) =>{
        dispatch(DoctorAppoinmentStatus(id,mode))
    }
    const clickView = (text) =>{
        console.log("called")
        QRCode.toDataURL(text).then((setSrc));
    }

    return (
        <>

            <div className="tableform">
                <div className="table-wrapper">          
        {
            userInfo.data[2] == "user" ? (
               
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h2>Manage Appointment</h2>
                                </div>
                            </div>
                        </div>
                        {
                        DeleteSuccess && (<div className="alert alert-success">Successfully deleted</div>)
                        }
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
                                    <th>Mode</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                </tr>

                                {appointments &&
                                    appointments.Appointments.map((appoint,index) => (
                                        <tr key={index}>
                                            <td>
                                                {appoint[0]}
                                            </td>
                                            <td>{appointments.Name.find(ele => ele[0] == appoint[1])[1] + " " + appointments.Name.find(ele => ele[0] == appoint[1])[2]}</td>
                                            <td>{"Dr. " + appointments.Doctor.find(ele => ele[0] == appoint[2])[1] + " " + appointments.Doctor.find(ele => ele[0] == appoint[2])[2]}</td>
                                            <td>{appoint[3]}</td>
                                            <td>{appoint[4]}</td>
                                            <td>{appoint[5]}</td>
                                            <td>{appoint[6]}</td>
                                            <td>{appoint[7]}</td>
                                            <td>
                                                <button className="btn btn-warning" id="buttonQr" data-toggle="modal" data-target="#exampleModal" onClick={() =>clickView(appoint[0])}>Details</button>
                                                <button className="btn btn-danger" onClick={() => deleteHandler(appoint[0])}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
            
        ) : (
        <>
      
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-6">
                            <h2>Manage Appointment</h2>
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
                            <th>Mode</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        </tr>

                        {appointments &&
                            appointments.Appointments.map((appoint, index) => (
                                !appoint[5].length > 0 && (
                                    <tr key={index}>
                                    <td>
                                        {appoint[0]}
                                    </td>
                                    <td>{appointments.Name.find(ele => ele[0] == appoint[1])[2] + " " + appointments.Name.find(ele => ele[0] == appoint[1])[3]}</td>
                                    <td>{appoint[3]}</td>
                                    <td>{appoint[4]}</td>
                                    {appoint[5]=="Accepted" ? (
                                    <td className="alert alert-success">
                                        {appoint[5]}
                                    </td>) : appoint[5] == "Declined" ? (
                                        <td className="alert alert-danger">
                                            {appoint[5]}
                                        </td>
                                    ): 
                                    (
                                        <td className="alert alert-warning">
                                        On-queue
                                            </td> 
                                    )
                                    }
                                    
                                    <td>{appoint[6]}</td>
                                    <td>{appoint[7]}</td>
                                    <td className="pepeFlex">
                                        <button className="btn btn-success" id="pepeButton" onClick={()=>{doctorActionHandler(appoint[0], "Accepted")}}><i className="fa-solid fa-circle-check"></i></button>
                                        <button className="btn btn-danger" id="pepeButo" onClick={()=>{doctorActionHandler(appoint[0], "Declined")}}><i className="fa-solid fa-rectangle-xmark"></i></button>
                                    </td>
                                </tr>
                                    )
                            ))
                        }
                    </tbody>
                </table>
            </div>
        
     
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-6">
                            <div class="container-fluid">
                            <h2>Current Appointment</h2>
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
                        <th>Status</th>
                        <th>Description</th>
                        <th>Mode</th>
                        <th>QR</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    </tr>

                    {appointments &&
                        appointments.Appointments.map((appoint, index) => (
                            appoint[5].length > 0 && (
                                <tr key={index}>
                                <td>
                                    {appoint[0]}
                                </td>
                                <td>{appointments.Name.find(ele => ele[0] == appoint[1])[2] + " " + appointments.Name.find(ele => ele[0] == appoint[1])[3]}</td>
                                <td>{appoint[3]}</td>
                                <td>{appoint[4]}</td>
                                {appoint[5]=="Accepted" ? (
                                <td className="alert alert-success">
                                    {appoint[5]}
                                </td>) : appoint[5] == "Declined" ? (
                                    <td className="alert alert-danger">
                                        {appoint[5]}
                                    </td>
                                ): 
                                (
                                    <td className="alert alert-warning">
                                    On-queue
                                        </td> 
                                )
                                }
                                
                                <td>{appoint[6]}</td>
                                <td>{appoint[7]}</td>
                                <td>
                                    <button className="btn btn-warning" id="buttonQr" data-toggle="modal" data-target="#exampleModal" onClick={() =>clickView(appoint[0])}>View</button>
                                </td>
                                
                            </tr>
                                )
                        ))
                    }
                </tbody>
            </table>
        </div>
   
    </>
    )
    }


                    {/*MODAL*/}
                    <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                    <img className="samplepic" src={src} alt ="signinbackground"/>
                                    </div>
                                   <div className="downloadPDFile"> <button type="button" className="btn btn-primary" id="downloadPDF"><i className="fa-solid fa-file-pdf" id="pdfLogo"></i>Download File</button>
                                   </div></div>
                                <div className="modal-footer">
                                    <button className="btn btn-danger" id="pepeButo" data-dismiss="modal" aria-label="Close"><i className="fa-solid fa-xmark" id="closeShit"></i> Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}