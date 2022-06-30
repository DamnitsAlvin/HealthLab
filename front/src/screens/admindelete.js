import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function DeleteAppointmentByAdmin(){
    const [deleteReq, setDeleteReq] = useState()
    const navigate = useNavigate()

    useEffect( async()=>{
        const {data} = await axios.get("http://localhost:5000/api/getdeleterequest")
        setDeleteReq(data ? data :  [])
    }, [])

    const deleteHandler = async(app_id) =>{
        const {status, data} = await axios.delete(`http://localhost:5000/api/deleteapp?id=${app_id}`)
        if(status == 200){
            setTimeout(()=>{
                window.location.reload(true)
            }, 3000)
           
        }
    }

    return(
    <div className="tableform">
        <div className="tableContainer">
            <div className="table-wrapper">
            <div className="table-title">
                <div className="row">
                    <div class="col-sm-6 p-0 flex justify-content-lg-start justify-content-center">
                        <h2 class="ml-lg-2">Manage Delete Appointment Request</h2>
                    </div>
                </div>
            </div>
            <table className="table table-striped table-hover">
                
                <thead>
                    <tr className="carbonLeody">
                        <th>Appointment ID</th>
                        <th>Reason</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                    </tr>
                    {
                        deleteReq && deleteReq.data.map(val=>(
                        <>
                        <tr>
                            <td><a href={`/invoice?appointID=${val[0]}`}>{val[0]}</a></td>
                            <td>{val[2]}</td>
                            <td><button className="btn btn-danger" onClick={()=>deleteHandler(val[0])}>Delete </button></td>
                        </tr>
                        </>
                        ))
                    }
                </tbody>
            </table>
            </div>
        </div>
    </div>
    )
}