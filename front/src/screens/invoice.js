import React, {useEffect, useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import html2canvas from 'html2canvas'
import {jsPDF} from 'jspdf'
import StripeCheckout from 'react-stripe-checkout'

export default function Invoice(){ 
    const [searchParams] = useSearchParams()
    const appointId = searchParams.get("appointID")
    const email = searchParams.get("email")
    const [displayData, setdisplayData] = useState()
    const [success, setsuccess] = useState()
    const [product] = useState({
        name:"Doctor's fee", 
        price: 500
    })
    const [didPay, setDidpay] = useState()

    const getuserInfo = useSelector(x => x.userSignIn)
    const {userInfo} = getuserInfo

    const navigate = useNavigate()

    useEffect( async ()=>{
        const {data} = await axios.get(`http://localhost:5000/api/getappointmentDetail?id=${appointId}`)
        if(data){
            setdisplayData(data)
        }
    }, [appointId, didPay])

    const DownloadHandler = () =>{
        const input = document.getElementById("containInvoice1")
        console.log("called")
        console.log(input)
        html2canvas(input, 
            {logging: true, 
            letterRendering: 1 , 
            useCORS: true, 
        }).then((canvas)=>{
            const imgWidth = 208 
            const imgHeight = canvas.height * imgWidth / canvas.width
            const imgData = canvas.toDataURL('img/png')
            const pdf = new jsPDF("p", "mm", "a3")
            pdf.addImage(imgData, "PNG",0,0, imgHeight, imgHeight)
            pdf.save(`${appointId}`)
        })
    }

    async function handleToken(token){
        const response = await axios.post("http://localhost:4000/checkout", {token, product})
        console.log({token})

        const {status} = response.data
        const {charge} = response.data
        console.log(charge.id)
        if (status === 'success'){
            const {data, status} = await axios.post("http://localhost:5000/api/paymentcheckout", {
                "id": appointId, 
                'receipt': charge.id
            })
            if(status == 200){
                setDidpay(true)
            }
            
        }else{
            setsuccess(false)
        }
         
    }
    
    return(
        <>
    <div className="containInvoice" id="containInvoice">
        <div className="main-content">
        <div className="invoice-container">
            <div className="top">
                <div className="top-left">
                    <h1 id="wewZer">Appointment Details</h1>
                    <span className="code">APT#{displayData && displayData.app_req[0]}  </span>
                </div>
                <div className="top-right">
                    <div className="date">Appointment Date: {displayData && displayData.app_req[3]} </div>  
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
                            <td colspan="2" className="number">{displayData && displayData.app_req[5].length >0 ? displayData.app_req[5] : "On-Queue" }</td>
                        </tr>
                        <tr className="total">
                            <td className="name">APPOINTMENT PAID</td>
                            <td colspan="2" className="number">{displayData && displayData.app_req[11] == 0 ? "UNPAID" : "PAID" }</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className="actions">
            {displayData && displayData.app_req[5] == "Done" ?(                
                <button className="btn btn-main" onClick={()=> navigate(`/createDiagnosis?id=${appointId}&email=${email}&name=${displayData && displayData.doc_info[1].concat(" ", displayData.doc_info[3])}`)}>Give Diagnosis</button>
            ): (null)}
            {displayData && displayData.app_req[11] == 0 ?  
            <StripeCheckout
            stripeKey="pk_test_51LJXn1DZAykMgcIKs9TPLiiCKOOGYDYwQaGBQcEKuNk1yZvusyVE5JKDH4TXLLqyAZocqTvNvCMjOZfFaKXaZhec00OsCbsfuV"
            token={handleToken}
            amount={500 * 100}
            name= "Doctor's Payment"
            /> : <></> }
            </div>
            {success!= undefined && success ? 
                <>
                <div className='alert alert-success'>Payment Success!</div>
                </>
                : <></>}
            <div className="note">
                <p id="notespace">Thank You for working with us!</p>
                <p>medicall.com</p>
            </div>
        </div>
        </div>
    </div>

    <div class="modal fade" id="staticBackdrop" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Payment Method</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div className="form-group">
      <label for="formGroupExampleInput">ACCOUNT NAME</label>
                    <input type="text" className="form-control"  placeholder="Account Name" required readOnly />
                </div>
                <label for="formGroupExampleInput">REFERENCE NUMBER</label>
                <div className="form-group">
                    <input type="text" className="form-control"  placeholder="Patient Last Name"  required readOnly/>
                </div>
                <label for="formGroupExampleInput">PAYMENT TYPE</label>
                <div className="form-group">
                    <input type="email" className="form-control"  placeholder="Gcash/Creditcard" required="required" readOnly/>
                </div>
                <hr></hr>
                <label for="formGroupExampleInput">ACCOUNT QR CODE</label>
                <div className="qr-container" >
                                        <img className="samplepic" alt="gcash qr/creditcard qr" />
                                    </div> <div className="downloadPDFile">

<button type="button" className="btn btn-primary" id="downloadPDF" ><i className="fa-solid fa-file-pdf" id="pdfLogo"></i>Upload Payment Receipt</button>

</div>
                                    
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-success">Confirm</button>
      </div>
    </div>
  </div>
</div>

    </>

    )


}