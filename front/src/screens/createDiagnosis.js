import { formatWithOptions } from 'date-fns/fp'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import emailjs from '@emailjs/browser';

export default function CreateDiagnosis() {
    const [params] = useSearchParams()
    const form = useRef()
    const id = params.get("id")
    const email = params.get("email")
    const name = params.get("name")

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_2n8fpsl', 'template_6llu3vi', form.current, 'T9vOuT4BccsjgoItY')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <form className="diagnosis-container" ref={form}>
            <div className='diagnosisHeader'>  <p>Medicall Report</p></div>
            <div className='top-right'>
                <div className="date" id="diagnosePatientID">Patient ID: PTR21516833  </div>
                <div className="date">Reported by: Dr. Roger Lim  </div>
            </div>

            <div className="card-body">
                <div className="row gutters">
                    <input type="hidden" value="alvinlim794@gmail.com" name="user_mail" />
                    <input type="hidden" value={name} name="from_name" />
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" id="diagnosisTab">
                        <div className="form-group">
                            <label htmlFor="fullName">Diagnosis</label>
                            <textarea class="form-control" id="diagnosisTabform" rows="3"></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="fullName">Procedures</label>
                            <textarea class="form-control" id="diagnosisTabform" rows="3"></textarea>
                        </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="text-right-jonathan">
                            <button type="button" id="submitReport" name="submit" className="btn btn-primary" onClick={sendEmail}>Send Report</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}