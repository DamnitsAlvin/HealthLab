import { formatWithOptions } from 'date-fns/fp'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import emailjs from '@emailjs/browser';

export default function CreateDiagnosis(){
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

    return(
        <form className="centerContainer" ref={form}>
            <div className="card-body">
                <div className="row gutters">
                    <input type="hidden" value="alvinlim794@gmail.com" name="user_mail"/>
                    <input type="hidden" value={name} name="from_name"/>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="fullName">Diagnosis</label>
                            <input type="text" className="form-control" name='message'/>      
                        </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="text-right-jonathan">
                            <button type="button" id="submitJonathan" name="submit" className="btn btn-primary" onClick={sendEmail}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}