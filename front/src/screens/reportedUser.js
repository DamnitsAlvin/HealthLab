import React, {useEffect, useState} from 'react'
import axios from "axios"

export default function ReportedUser(){
    const [reportedUser, setReportedUser] = useState()
    const [reportedUserToDisp, setReportedUserToDisp] = useState()
    const [viewid, setViewId ] = useState()
   
    useEffect( async()=>{
        const {data} = await axios.get("http://localhost:5000/api/getreporteduser")
        setReportedUser(data ? data.reported : [])

        if(data){
            const values = []
            data.reported.map((val)=>{
                if (values.indexOf(val[0]) == -1){
                    values.push(val[0])
                }
            })
            setReportedUserToDisp(values)
        }
    }, [])
    console.log(reportedUserToDisp)

    const deleteHandler = async() =>{
        const {status, data} = await axios.delete(`http://localhost:5000/api/deletereporteduser?id=${viewid}`)
        if(status==200){
            window.location.reload(true)
        }
    }

    return(
        <div className="tableform">
        <div className="tableContainer">
            <div className="table-wrapper">
            <div className="table-title">
                <div className="row">
                    <div class="col-sm-6 p-0 flex justify-content-lg-start justify-content-center">
                        <h2 class="ml-lg-2">Manage Reported User</h2>
                    </div>
                </div>
            </div>
            <table className="table table-striped table-hover">
                
                <thead>
                    <tr className="carbonLeody">
                        <th>User ID</th>
                        <th>Reports</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                    </tr>
                        {
                            reportedUserToDisp && reportedUserToDisp.map((val, index) =>(
                                <tr key={index}>
                                    <td>{val}</td>
                                    <td>{reportedUser.filter((disp=> disp[0] == val )).length}</td>
                                    {
                                        reportedUser.filter((disp=> disp[0] == val )).length > 2 ?(
                                            <td className="alert alert-danger">Subject for termination</td> 
                                        ) : (
                                            <td className="alert alert-warning">Warning</td>
                                        )
                                    }
                                    {
                                        reportedUser.filter((disp=> disp[0] == val )).length > 2 ?(
                                            <td className="pepeFlex">
                                                <button className="btn btn-danger" id="pepeButton" data-toggle="modal" data-target="#terminate" onClick={()=>setViewId(val)}>Terminate</button> 
                                                <button className="btn btn-warning"  id="pepeButo" data-toggle="modal" data-target="#detailsuser" onClick={()=>setViewId(val)}>Details</button> 
                                            </td>
                                        ) : (
                                           <td>
                                                <button className="btn btn-warning"  id="pepeButo" data-toggle="modal" data-target="#detailsuser" onClick={()=>setViewId(val)}>Details</button> 
                                           </td>
                                        )
                                    }
                                </tr>
                            )

                            )
                        }
                </tbody>
            </table>
            </div>
        </div>


        <div className="modal fade" id="terminate" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="reject">Manage User</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete this user?</p>

                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-warning" id="pepeButo" data-dismiss="modal" aria-label="Close" onClick={deleteHandler}><i className="fa-solid fa-circle-check"></i> DELETE</button>
                        <button className="btn btn-danger" id="pepeButo" data-dismiss="modal" aria-label="Close"><i className="fa-solid fa-xmark" id="closeShit"></i> Close</button>
                    </div>
                </div>
            </div>
        </div>
        {/*MODAL DELETE*/}


        {/*MODAL DISPLAY*/}

        <div class="modal fade" id="detailsuser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"disable={true}>Events</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    {
                        reportedUser && reportedUser.filter((val)=> val[0] == viewid).map((gg)=>(
                           <>
                           <div class="modal-body">
                                <h5>Reporter's ID</h5>
                                <input className="form-control" value={gg[1]} disabled/>
                                <h5>Reason</h5>
                                <input className="form-control" value={gg[2]}disabled/>
                                <h5>Date</h5>
                                <input className="form-control" value={gg[4]} disabled/>
                            </div>
                            <hr></hr>
                            </>
                        ))
                    }
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal" >Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}