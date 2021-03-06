import React, { useEffect, useState, useRef} from "react";
import { useSelector, useDispatch } from "react-redux"
import { DoctorAppoinmentStatus } from "../actions/doctorActions";
import { deleteAppointment, getAppointments } from "../actions/userActions"
import { useNavigate } from 'react-router-dom'
import QRCode from 'qrcode'
import axios from "axios";



export default function AppointmentPage() {

    const getAppoint = useSelector(x => x.userAppointment)
    const { appointments, message } = getAppoint
    const navigate = useNavigate()
    const closeRef = useRef()

    const delAppoint = useSelector(x => x.deleteAppointment)
    const setAppoint = useSelector(x => x.setAppointmentMode)
    const { setAppointsuccess } = setAppoint

    const [appointID, setappointID] = useState(0)

    const { DeleteSuccess, DeleteMessage } = delAppoint

    const getUser = useSelector(x => x.userSignIn)
    const { userInfo } = getUser
    const [src, setSrc] = useState("")
    const [reason, setReason] = useState("")

    const dispatch = useDispatch()
    const dispatch1 = useDispatch()

    useEffect(() => {
        dispatch(getAppointments(userInfo.data[0], userInfo.data[2]))
    }, [dispatch, setAppointsuccess])


    const doctorActionHandler = (id, mode) => {
        dispatch(DoctorAppoinmentStatus(id, mode))
    }
    const deleteHandler = () => {
        dispatch1(deleteAppointment(appointID, reason))
    }
    console.log("App ID selected: ", appointID)
    const clickView = (id, patient, doctor, date, time, status, desciption, mode) => {
        console.log("called")
        QRCode.toDataURL(`http://localhost:3000/invoice?appointID=${id}`).then((setSrc));
        const data = generatePDF()
    }

    setTimeout(() => {
        const inter = document.getElementById('inter')
        if (inter) {
            inter.style.display = "none"
            window.location.reload(true)
        }

    }, 4000)


    const downloadPDF = () => {
        // if(file){
        //     saveAs(file, 'slip.pdf')
        // }
    }
    const generatePDF = () => {
        const pdfConstru = `
        <div className="table-wrapper">
        <div className="table-title">
            <div className="row">
                <div className="col-sm-6">
                    <h2>Manage Appointment</h2>
                </div>
            </div>
        </div>
        `
    }

    return (
        <>
            <div className="tableform">
                <div className="tableContainer">
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
                                    DeleteSuccess && (<div id="inter" className="alert alert-success">{DeleteMessage}</div>)
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
                                            <th>Action</th>
                                            <th>Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        </tr>

                                        {appointments && appointments.Appointments &&
                                            appointments.Appointments.map((appoint, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <a href={`/invoice?appointID=${appoint[0]}`}> {appoint[0]} </a>
                                                    </td>
                                                    <td>{appointments.Name.find(ele => ele[0] == appoint[1])[1] + " " + appointments.Name.find(ele => ele[0] == appoint[1])[2]}</td>
                                                    <td>{"Dr. " + appointments.Doctor.find(ele => ele[0] == appoint[2])[1] + " " + appointments.Doctor.find(ele => ele[0] == appoint[2])[2]}</td>
                                                    <td>{appoint[3]}</td>
                                                    <td>{appoint[4]}</td>
                                                    <td>{appoint[5]}</td>

                                                    <td>
                                                        <button className="btn btn-warning" id="buttonQr" data-toggle="modal" data-target="#exampleModal" onClick={() => clickView(appoint[0],
                                                            appointments.Name.find(ele => ele[0] == appoint[1])[1] + " " + appointments.Name.find(ele => ele[0] == appoint[1])[2],
                                                            "Dr. " + appointments.Doctor.find(ele => ele[0] == appoint[2])[1] + " " + appointments.Doctor.find(ele => ele[0] == appoint[2])[2],
                                                            appoint[3],
                                                            appoint[4],
                                                            appoint[5],
                                                            appoint[6],
                                                            appoint[7])}>Details</button>

                                                    </td>
                                                    <td>   <button className="btn btn-danger"data-toggle="modal" data-target="#cancelModal" onClick={()=>setappointID(appoint[0])}>
                                                        {appoint[5] == "Declined" || appoint[5] == ""  ? 'DELETE' : 'CANCEL'
                                                        }
                                                        </button></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>

                        ) :
                            userInfo.data[2] == "service" ? (
                                <>
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
                                                    <th>Status</th>
                                                    <th>Description</th>
                                                    <th>Mode</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                </tr>

                                                {appointments && appointments.Appointments &&
                                                    appointments.Appointments.map((appoint, index) => (
                                                        !appoint[5].length > 0 && (
                                                            <tr key={index}>
                                                                <td>
                                                                    {appoint[0]}
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

                                                                <td>{appoint[6]}</td>
                                                                <td>{appoint[7]}</td>
                                                                <td className="pepeFlex">
                                                                    <button className="btn btn-success" id="pepeButton" data-toggle="modal" data-target="#viewModal" onClick={() => setappointID(appoint[0])}><i className="fa-solid fa-circle-check"></i></button>
                                                                    <button className="btn btn-danger" id="pepeButo" data-toggle="modal" data-target="#rejectModal" onClick={() => setappointID(appoint[0])}><i className="fa-solid fa-rectangle-xmark"></i></button>
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
                                                    <div className="container-fluid">
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
                                                    <th>Queue</th>
                                                    <th>Status</th>
                                                    <th>Description</th>

                                                    <th>QR</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                </tr>

                                                {appointments && appointments.Appointments &&
                                                    appointments.Appointments.map((appoint, index) => (
                                                        appoint[5].length > 0 && (
                                                            <tr key={index}>
                                                                <td>
                                                                    {appoint[0]}
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
                                                                    ) :
                                                                    (
                                                                        <td className="alert alert-warning">
                                                                            On-queue
                                                                        </td>
                                                                    )
                                                                }

                                                                <td>{appoint[6]}</td>

                                                                <td>
                                                                    <button className="btn btn-warning" id="buttonQr" data-toggle="modal" data-target="#exampleModal" onClick={() => clickView(appoint[0])}>View</button>
                                                                </td>

                                                            </tr>
                                                        )
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            ) :

                                (
                                   null
                                )
                    }


                    {/*MODAL Detail*/}
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

                                        <button type="button" className="btn btn-primary" id="downloadPDF" onClick={downloadPDF}><i className="fa-solid fa-file-pdf" id="pdfLogo"></i>Download File</button>

                                    </div></div>
                                <div className="modal-footer">
                                    <button className="btn btn-danger" id="pepeButo" data-dismiss="modal" aria-label="Close"><i className="fa-solid fa-xmark" id="closeShit"></i> Close</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*MODAL ACCEPT*/}
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
                    {/*MODAL REJECT*/}


                    {/*MODAL CANCEL*/}

                    <div class="modal fade" id="cancelModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel"disable={true}>Cancel Request</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <h6>Reason of Cancellation</h6>
                                    <textarea class="form-control" id="diagnosisTabform"  name="message" value={reason} onChange={e=>{setReason(e.target.value)}}></textarea>
                                </div>
                                <div class="modal-footer">
                                <button type="button" class="btn btn-success" onClick={()=>{deleteHandler(); closeRef.current.click()}}>Submit</button>
                                    <button type="button" class="btn btn-danger" ref={closeRef} data-dismiss="modal">Close</button>
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*MODAL CANCEL*/}



                </div>
            </div>

        </>
    );
}