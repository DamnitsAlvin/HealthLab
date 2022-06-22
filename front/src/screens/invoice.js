import React, {useEffect, useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

export default function Invoice(){ 
    const [searchParams] = useSearchParams()
    const appointId = searchParams.get("appointID")
    const [displayData, setdisplayData] = useState()

    useEffect( async ()=>{
        const {data} = await axios.get(`http://localhost:5000/api/getappointmentDetail?id=${appointId}`)
        if(data){
            setdisplayData(data)
        }
    }, [appointId])
    
    console.log(displayData)
    return(
        <>
        <div className="containInvoice">
        <div className="main-content">
        <div className="invoice-container">
            <div className="top">
                <div className="top-left">
                    <h1 id="wewZer">Appointment Details</h1>
                    <span className="code">#{displayData && displayData.app_req[0]}  (appointment number)</span>
                </div>
                <div className="top-right">
                    <div className="date">Date: {displayData && displayData.app_req[3]} </div>
                    <div className="date">Date Booked: {displayData && displayData.app_req[8].split(" ")[0]}</div>
                </div>
            </div>
            <div className="bill-box">
                <div className="left">
                    <div className="text-m">Requested by:</div>
                    <div className="title">{displayData && displayData.patient[2].concat(" ", displayData.patient[3])}</div>
                    <div className="addr">Patient</div>
                    
                </div>
                <div className="right">
                    <div className="text-m">Received by:</div>
                    <div className="title">Dr. {displayData && displayData.doc_info[1].concat(" ", displayData.doc_info[3])}</div>
                    <div className="addr">{displayData && displayData.specialty.map((values)=> values +" / " )}</div>
                </div>
            </div>
            <div className="table-bill">
                <table className="table-service">
                    <thead>
                        <th className="quantity">Category</th>
                        <th>Description</th>
                        <th className="cost">Consultation</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{displayData && displayData.specialty.map((values)=> values +" / " )}</td>
                            <td>{displayData && displayData.app_req[6]}</td>
                            <td className="cost">{displayData && displayData.app_req[7]}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr className="total">
                            <td className="name">APPOINTMENT STATUS</td>
                            <td colspan="2" className="number">{displayData && displayData.app_req[5]}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className="actions">
                <button className="btn btn-main">Print Details</button>
            </div>
            <div className="note">
                <p>Thank You for working with us!</p>
                <p>medicall.com</p>
            </div>
        </div>
        </div>
    </div>
    </>

    )


}