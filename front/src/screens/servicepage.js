import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function ServicePage(){
    const navigate = useNavigate()
    const {category} = useParams()
    const [services, setservices] = useState([])
    const [serviceToDisp, setserviceToDisp] = useState([])
    useEffect( async()=>{
        const {status, data} = await axios.get(`http://localhost:5000/api/getServiceTodisp?category=${category}`)

        console.log("response:", status)
        if(status == 200){
            setservices(data)
            setservices((services)=>{
                setserviceToDisp(services)
                return services
            })
        }else{
            setservices([])
            setservices((services)=>{
                setserviceToDisp(services)
                return services
            })
        }

    }, [category])

    
    const searchHandler = (event) =>{
        if(services && services.service_name){
            
            let values = services.service_name
            if(event.target.value){
                values = values.filter(val =>{
                    if(val[1].substring(0,event.target.value.length).toLowerCase() == event.target.value.toLowerCase()){
                        return val
                    }
                })
            }
            setserviceToDisp({
                ...serviceToDisp, 
                service_name: values
            })
        }
    }
    const viewServiceHander = (id) =>{
        navigate(`/bookservice/${id}`)
    }
    const bookServiceHandler = (id, mode) =>{
        navigate(`/createServiceAppointment?service=${id}`)
    }
    
    return(
        <>
        <div className="wow fadeInDown" data-wow-delay="0.1s">
        <div className="containerWhole d-flex justify-content-center">
        <div className="cardBook">
            <div className="top-doctor-page">
                <input type="text" className="form-control-bobo" onChange={(event)=>searchHandler(event)}/>
                <div className="input-group-append" id="form3"><button className="btn btn-primary"id="bobo5">Search</button></div>
                
                <div className="form-outline">
            
                    <select className="form-control category-dropdown" value={category} onChange={(event)=>navigate(`/service/${event.target.value}`)}>
                        <option value="Blood Chemistry">Blood Chemistry</option>
                        <option value="Urinalysis">Urinalysis</option>
                        <option value="PCR Testing">PCR Testing</option>
                        <option value="Saliva Testing">Saliva Testing</option>
                        <option value="X-RAY">X-RAY</option>
                        <option value="Physical Therapy">Physical Therapy</option>
                        <option value="CT-Scan">CT-Scan</option>
                        <option value="Mental Health">Mental Health</option>
                    </select>
                </div>
            </div>

            <div className="textBookHeader">We've found {serviceToDisp && serviceToDisp.offered ? serviceToDisp.offered.length :"0"} Services you can book with!</div>
        
        {
            serviceToDisp && serviceToDisp.service_name && serviceToDisp.service_name.map((values, index)=>(
                <div className="flex-doctor-info" key={index}>
                <div className="flex-doctor-desc">
                    <p className="headerBook">{values[1]}</p> 
                    <button type="button" className="btn btn-primary" id="buttonBook" onClick={()=>bookServiceHandler(values[0])}>Book this</button>
                </div>
                
                <div className="flex-doctor-desc">
                    <p className="headerBook">Location</p> 
                    <small className="text-muted">{serviceToDisp.service_location.find(el => el[0] == values[0])[1]}</small>
                    <button type="button" className="btn btn-primary" id="buttonView" onClick={()=>{viewServiceHander(values[0])}}>View Detail</button>
                </div>

                <div className="price">
                    <img className="bookImg" src={values[5]}/>
                </div>
            </div>
            ))
        }
            

           
        </div>
    </div>
            <div className="bobo4">
                <div className="demo">
                    <nav className="pagination-outer" aria-label="Page navigation">
                        <ul className="pagination">
                            <li className="page-item">
                                <a href="#" className="page-link" aria-label="Previous">
                                    <span aria-hidden="true">«</span>
                                </a>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item active"><a className="page-link" href="#">3</a></li>
                            <li className="page-item"><a className="page-link" href="#">4</a></li>
                            <li className="page-item"><a className="page-link" href="#">5</a></li>
                            <li className="page-item">
                                <a href="#" className="page-link" aria-label="Next">
                                    <span aria-hidden="true">»</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <p className="bobo">Cardiologists Near You | Find the Right Doctor </p>
                <p className="bobo2">Find the right cardiologist near you. Book an appointment today and be on your way to recovery.</p>
                <p className="bobo3">Find the right cardiologist near you. Book an appointment today and be on your way to recovery.</p>
            </div>
        </div>
        </>
    )
}