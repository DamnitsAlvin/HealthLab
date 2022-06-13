import React, { useEffect } from 'react'; 
import {useSelector, useDispatch} from 'react-redux';
import {getDoctor} from "../actions/doctorActions"

export default function DoctorPage(){
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getDoctor("general_health"))
    }, [dispatch])
    return(
        <>
        <div className="wow fadeInDown" data-wow-delay="0.1s">
        <div className="containerWhole d-flex justify-content-center">
        <div className="cardBook">
            <div className="top-doctor-page">
                <input type="text" className="form-control-bobo"/>
                <div className="input-group-append" id="form3"><button className="btn btn-primary"id="bobo5">Search</button></div>
                
                <div className="form-outline">
                    <input type="search" id="form2" className="form-control" placeholder="Categories" aria-label="Search" />
                </div>
            </div>

            <div className="textBookHeader">We've found 631 Doctors you can book with!</div>

            <div className="flex-doctor-info">
                <div className="flex-doctor-desc">
                    <p className="headerBook">Dr. JEROME B. PANAGSAGAN </p> 
                    <small className="text-muted">MD MACHO DANCER RMT</small>
                    <button type="button" className="btn btn-primary" id="buttonBook">Book Doctor</button>
                </div>
                <div className="flex-doctor-desc">
                    <p className="headerBook">Consultation Type</p> 
                    <small className="text-muted">Online Consultation</small>
                    <button type="button" className="btn btn-primary" id="buttonView">View Doctor</button>
                </div>

                <div className="price">
                    <img className="bookImg" src="/img/doctor/betlog.jpg"/>
                </div>
            </div>

            <div className="flex-doctor-info">
                <div className="flex-doctor-desc">
                    <p className="headerBook">Dr. Jonathan Kyle Lozano</p> 
                    <small className="text-muted">MD MACHO DANCER RMT</small>
                    <button type="button" className="btn btn-primary" id="buttonBook">Book Doctor</button>
                </div>

                <div className="flex-doctor-desc">
                    <p className="headerBook">Consultation Type</p> 
                    <small className="text-muted">Online Consultation</small>
                    <button type="button" className="btn btn-primary" id="buttonView">View Doctor</button>
                </div>

                <div className="price">
                    <img className="bookImg" src="/img/doctor/wew.jpg"/>
                </div>
            </div>

            <div className="flex-doctor-info">
                <div className="flex-doctor-desc">
                    <p className="headerBook">Dr. Jonathan Kyle Lozano</p> 
                    <small className="text-muted">MD MACHO DANCER RMT</small>
                    <button type="button" className="btn btn-primary" id="buttonBook">Book Doctor</button>
                </div>

                <div className="flex-doctor-desc">
                    <p className="headerBook">Consultation Type</p> 
                    <small className="text-muted">Online Consultation</small>
                    <button type="button" className="btn btn-primary" id="buttonView">View Doctor</button>
                </div>

                <div className="price">
                    <img className="bookImg" src="/img/doctor/wew.jpg"/>
                </div>
            </div>

           
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
                <p className="bobo">Cardiologists Near You | Find the Right Doctor for Your Heart</p>
                <p className="bobo2">Find the right cardiologist near you. Book an appointment today and be on your way to recovery.</p>
                <p className="bobo3">Find the right cardiologist near you. Book an appointment today and be on your way to recovery.</p>
            </div>
            </div>
        </>
    )
}