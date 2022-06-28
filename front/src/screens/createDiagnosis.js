
import React, { useRef, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import emailjs from '@emailjs/browser';

export default function CreateDiagnosis() {
    const [params] = useSearchParams()
    const form = useRef()
    const id = params.get("id")
    const email = params.get("email")
    const name = params.get("name")
    const navigate = useNavigate()
    
    const [error, seterror] = useState()

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_2n8fpsl', 'template_6llu3vi', form.current, process.env.REACT_APP_MAPJS_API_KEY)
            .then((result) => {
                console.log(result.text);
                seterror(false)
                setTimeout(()=>{
                    navigate("/appointments")
                }, 2000)
            }, (error) => {
                console.log(error.text);
                seterror(true)
            });
    };

    return (
        <form className="diagnosis-container" ref={form}>
            <div className='diagnosisHeader'>  <p>Medicall Report</p></div>
            <div className='top-right'>
                <div className="date" id="diagnosePatientID">Patient ID: {id} </div>
                <div className="date">Reported by: Dr. {name}  </div>
            </div>

            <div className="card-body">
                <div className="row gutters">
                    <input type="hidden" value="alvinlim794@gmail.com" name="user_mail" />
                    <input type="hidden" value={name} name="from_name" />
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" id="diagnosisTab">
                        <div className="form-group">
                            <label htmlFor="fullName">Diagnosis</label>
                            <textarea class="form-control" id="diagnosisTabform"  name="message" ></textarea>
                           
                        </div>
                        <div className="form-group">
                            <label htmlFor="fullName">Procedures</label>
                            <textarea class="form-control" id="diagnosisTabform" rows="3" name="procedure" ></textarea>
                     
                        </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="text-right-jonathan">
                            <button type="button" id="submitReport" name="submit" className="btn btn-primary" onClick={sendEmail}>Send Report</button>
                            {error==undefined ? (null) : !error? (
                                <div className="alert alert-success"> Email was successfully sent </div>
                            ):(
                                <div className="alert alert-danger"> There was an error sending an email</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}