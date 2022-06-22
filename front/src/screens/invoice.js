import React, {} from 'react'

export default function Invoice()
{
   
    return(
        <>
        <div className="containInvoice">
        <div className="main-content">
        <div className="invoice-container">
            <div className="top">
                <div className="top-left">
                    <h1 id="wewZer">Appointment Details</h1>
                    <span className="code">#258942(qr number)</span>
                </div>
                <div className="top-right">
                    <div className="date">Date: 23.08.2022(now)</div>
                    <div className="date">Date Booked: 23.02.2022</div>
                </div>
            </div>
            <div class="bill-box">
                <div className="left">
                    <div className="text-m">Requested by:</div>
                    <div className="title">Crister Palumpon</div>
                    <div className="addr">Patient</div>
                    
                </div>
                <div className="right">
                    <div className="text-m">Received by:</div>
                    <div className="title">Dr. Alvin Lim</div>
                    <div className="addr">General Medicine ( category )</div>
                </div>
            </div>
            <div clasNames="table-bill">
                <table className="table-service">
                    <thead>
                        <th className="quantity">Category</th>
                        <th>Description</th>
                        <th className="cost">Consultation</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>General Medicine</td>
                            <td>My heart went oops</td>
                            <td className="cost">Online </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr className="total">
                            <td className="name">APPOINTMENT STATUS</td>
                            <td colspan="2" className="number">ACCEPTED</td>
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