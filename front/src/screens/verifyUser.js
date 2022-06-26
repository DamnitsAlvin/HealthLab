import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'
import Results from './results'
export default function VerifyUser(){
    const [usersToVerify, setverify] = useState({})
    const [imgSrc, setSrc] = useState([])
    const [userId, setUserId] = useState()
    const [user, setuser] = useState()

    useEffect( async()=>{
        const {data} = await axios.get("http://localhost:5000/api/getDoctorServiceToVerify")
        if(data){
            setverify( prevState =>{
                return data
            })
        }
    }, [])

    const VerifyUser = async(mode) =>{
        const {status} = await axios.post("http://localhost:5000/api/setVerifyAccepted", {"id": userId, "user":user, "mode":mode})
        
        if(status==200){
            window.location.reload(true)
        }
    }

    
    return(
        <>

        <div className="tableform">   
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row">
                        <div class="col-sm-6 p-0 flex justify-content-lg-start justify-content-center">
                            <h2 class="ml-lg-2">Manage Appointment</h2>
                        </div>
                    </div>
                </div>
                <table className="table table-striped table-hover">

                    <thead>
                        <tr className="carbonLeody">
                            <th>User ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                        </tr>
                        {usersToVerify && usersToVerify.ToVerify && usersToVerify.ToVerify.map((val, index)=>(
                            <tr key={index}>
                                <td><a href={`/book${val[5]}/${val[0]}`}>{val[0]}</a></td>
                                <td>{val[2]}</td>
                                <td>{val[3]}</td>
                                <td><button className="btn btn-warning" id="buttonQr" data-toggle="modal" data-target="#exampleModal" onClick={() =>setSrc([val[4], val[5]])}>View</button></td>
                                <td className="pepeFlex">
                                        <button className="btn btn-success" id="pepeButton" data-toggle="modal" data-target="#viewModal" onClick={()=>{setUserId(val[0]); setuser(val[6])}} ><i className="fa-solid fa-circle-check"></i></button>
                                        <button className="btn btn-danger" id="pepeButo" data-toggle="modal" data-target="#rejectModal" onClick={()=>{setUserId(val[0]); setuser(val[6])}} ><i className="fa-solid fa-rectangle-xmark"></i></button>
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        {/*MODAL*/}
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Doctor Identification Picture </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="qr-container" >
                            <img className="samplepic" src={imgSrc[0]}/>
                        </div>
                        <div className="qr-container" >
                            <img className="samplepic" src={imgSrc[1]}/>
                        </div>
                        <div className="downloadPDFile">                         
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
                        <h5 className="modal-title" id="viewModal">Verify user</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to verify this user?</p>

                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-success" id="pepeButo" data-dismiss="modal" aria-label="Close" onClick={()=>VerifyUser("Accept")}><i className="fa-solid fa-circle-check"></i> Accept</button>
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
                        <h5 className="modal-title" id="reject">Verify user</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to reject this user?</p>

                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-warning" id="pepeButo" data-dismiss="modal" aria-label="Close" onClick={()=>VerifyUser("Reject")}><i className="fa-solid fa-circle-check"></i> Reject</button>
                        <button className="btn btn-danger" id="pepeButo" data-dismiss="modal" aria-label="Close"><i className="fa-solid fa-xmark" id="closeShit"></i> Close</button>
                    </div>
                </div>
            </div>
        </div>
                {/*MODAL REJECT*/}
        </>
    )
}