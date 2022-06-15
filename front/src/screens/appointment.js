import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { deleteAppointment, getAppointments } from "../actions/userActions"

export default function AppointmentPage() {
    const dispatch = useDispatch()
    const getAppoint = useSelector(x => x.userAppointment)
    const { loading, appointments, message } = getAppoint
    const delAppoint = useSelector(x => x.deleteAppointment)

    const { DeleteSuccess } = delAppoint

    const getUser = useSelector(x => x.userSignIn)
    const { userInfo } = getUser


    useEffect(() => {
        dispatch(getAppointments(userInfo.data[0], userInfo.data[2]))
    }, [dispatch, DeleteSuccess])

    const deleteHandler = (appointId) => {
        if (window.confirm(`Are you sure you want to delete appointment ${appointId}?`) == true) {
            dispatch(deleteAppointment(appointId))
        }

    }

    return (
        <>

            <div className="tableform">
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
                                        <th>Mode</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    </tr>

                                    {appointments &&
                                        appointments.Appointments.map((appoint) => (
                                            <tr>
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
                                                    <button className="btn btn-success" >Details</button>
                                                    <button className="btn btn-danger" onClick={() => deleteHandler(appoint[0])}>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                        ) : (

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
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    </tr>

                                    {appointments &&
                                        appointments.Appointments.map((appoint) => (
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
                                                    <button className="btn btn-warning" id="buttonQr" data-toggle="modal" data-target="#exampleModal">View</button>
                                                </td>
                                                <td class="pepeFlex">
                                                    <button className="btn btn-success" id="pepeButton" ><i class="fa-solid fa-circle-check"></i></button>
                                                    <button className="btn btn-danger" id="pepeButo"><i class="fa-solid fa-rectangle-xmark"></i></button>

                                                </td>
                                            </tr>


                                        ))
                                    }

                                </tbody>
                            </table>
                        )

                    }


                    {/*MODAL*/}
                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Appointment Details</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="qr-container" >
                                    <img class="samplepic" src="/img/backgrounds/PFLI-0001.jpeg" alt ="signinbackground"/>
                                    </div>
                                   <div class="downloadPDFile"> <button type="button" class="btn btn-primary" id="downloadPDF"><i class="fa-solid fa-file-pdf" id="pdfLogo"></i>Download File</button>
                                   </div></div>
                                <div class="modal-footer">
                                    <button className="btn btn-danger" id="pepeButo" data-dismiss="modal" aria-label="Close"><i class="fa-solid fa-xmark" id="closeShit"></i> Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}