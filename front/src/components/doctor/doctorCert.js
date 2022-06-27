import React, {useEffect, useState} from 'react'

export default function DoctorCert(props){
    const {data, ParentFunction, doc_id} = props
    const [Cert, setCert] = useState([])
    const CertChangeHandler = (event, index) =>{
        const values = [...Cert]
        values[index][event.target.name] = event.target.value
        setCert(values)
        ParentFunction(values)
    }
    const removeCertFieldHandler = (index) =>{
        const values = [...Cert]
        values.splice(index, 1)
        setCert(values)
        ParentFunction(values)
    }
    const addCertFieldHandler = () =>{
        setCert([
            ...Cert, 
            {
                cert_title: "", 
                cert_issuer: "", 
                cert_acquired: "", 
                doctor_id: doc_id, 
                id: ""
            }
        ])
    }
    
    useEffect(()=>{
        if(data){
            data.map(values =>{
                setCert(prevState => ([
                    ...prevState, 
                    {
                        cert_title: values[2], 
                        cert_issuer: values[3], 
                        cert_acquired: values[4],
                        doctor_id: values[0], 
                        id: values[1]
                    }
                ]))
            })
        }
       
    }, [data])

    
    return(
        <div className="pard_3">
                <div className="card-body">
                    <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <h6 className="mb-2 text-primary"><i class="fa fa-certificate" aria-hidden="true"id="fontawesomeSpace"></i>Certification</h6>
                        </div>
                        {Cert.map((value, index)=>(
                            <div key={index}>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="form-group">
                                    <label htmlFor="fullName">Certification Title</label>
                                    <input type="text" className="form-control"  name="cert_title" value={value.cert_title} onChange={(event)=>CertChangeHandler(event, index)}/>
                                </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="form-group">
                                    <label htmlFor="fullName">Certification Issuer</label>
                                    <input type="text" className="form-control"  name='cert_issuer'value={value.cert_issuer} onChange={(event)=>CertChangeHandler(event, index)} />
                                </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="form-group">
                                    <label htmlFor="fullName">Date Acquired</label>
                                    <input type="date" className="form-control"  name='cert_acquired' value={value.cert_acquired} onChange={(event)=>CertChangeHandler(event, index)}/>
                                </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="text-right">
                                        <button type="button" onClick={()=>removeCertFieldHandler(index)} className="btn btn-danger">Remove</button>
                                    </div>
                                    <hr></hr>
                            </div>
                            
                           
                            </div>
                        ))}
                       
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="text-right">
                                <button type="button" onClick={addCertFieldHandler} className="btn btn-success" id="colorBlue">Add Fields</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
    )
}