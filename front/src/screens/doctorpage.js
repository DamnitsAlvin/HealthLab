import React, { useEffect, useState } from 'react'; 
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {getDoctor} from "../actions/doctorActions"

export default function DoctorPage(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {category} = useParams()

    useEffect(()=>{
        dispatch(getDoctor(category))
    }, [dispatch, category])

    const getDoc = useSelector(x => x.getDoc)
    const {doctorLoading, doctors, error} = getDoc
    const [docToDisp, setDocToDisp] = useState([])
    const [mode, setMode] = useState()
    useEffect(()=>{
        setDocToDisp(doctors ? doctors.data: [])
    }, [doctors])

    if(docToDisp){
        console.log("Display:", docToDisp)
    }
    const searchHandler = (event) =>{
        let values = doctors.data
        if(event.target.value){
            values = values.filter((val) => {
                if(val[1].substring(0, event.target.value.length) == event.target.value || val[3].substring(0, event.target.value.length) == event.target.value){
                    return val
                }
            })
        }else{
            values = doctors.data
        }
        setDocToDisp(values)
    }
    const dropdownHandler = (event) =>{
        const toCategory = event.target.value; 
        navigate(`/doctor/${toCategory}`)
    }

    const viewDoctorHander = (id) =>{
        navigate(`/bookdoctor/${id}`)
    }
    const bookDoctorHandler = (id, mode) =>{
        navigate(`/createAppointment?doctor=${id}&mode=${mode}`)
    }
    return(
        <>
        <div className="wow fadeInDown" data-wow-delay="0.1s">
        <div className="containerWhole d-flex justify-content-center">
        <div className="cardBook">
            <div className="top-doctor-page">
                <input type="text" className="form-control-bobo" onChange={searchHandler}/>
                <div className="input-group-append" id="form3"><button className="btn btn-primary"id="bobo5">Search</button></div>
                
                <div className="form-outline">
                    <select className="form-control category-dropdown" onChange={dropdownHandler} value={category}>
                        <option value="General Medicine">General Medicine</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Neurology">Neurology</option>
                        <option value="Nephrology">Nephrology</option>
                        <option value="OB GYNE">OB GYNE</option>
                        <option value="Optalmology">Optalmology</option>
                        <option value="Dermatology">Dermatology</option>
                        <option value="Dentistry">Dentistry</option>

                    </select>
                </div>
            </div>

            <div className="textBookHeader">We've found {docToDisp.length} Doctors you can book with!</div>
        
        {
            docToDisp ? docToDisp.map( (values) =>(
            <div className="flex-doctor-info">
                <div className="flex-doctor-desc">
                    <p className="headerBook">Dr. {`${values[1]} ${values[2]} ${values[3]} `} </p> 
                    <small className="text-muted">{ doctors && doctors.titles.map((x)=>{
                        if(x[0] == values[0]){
                            return x[1];
                        }
                    }).join(" ")}</small>
                    <button type="button" className="btn btn-primary" id="buttonBook" onClick={()=>{bookDoctorHandler(values[0], values[8])}}>Book Doctor</button>
                </div>
                <div className="flex-doctor-desc">
                    <p className="headerBook">Consultation Type</p> 
                    <small className="text-muted">{values[8] == 0 ? "Online Consulation only" : 
                                                    values[8] == 1 ? "Face to Face Consulation only": 
                                                    "Face to Face and Online Consulation"}</small>
                    <button type="button" className="btn btn-primary" id="buttonView" onClick={()=>{viewDoctorHander(values[0])}} >View Doctor</button>
                </div>

                <div className="price">
                    <img className="bookImg" src={values[10]}/>
                </div>
            </div>

            )): <></> 
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
                <p className="bobo">Cardiologist Near You | Find the Right Doctor </p>
                <p className="bobo2">Find the right cardiologist near you. Book an appointment today and be on your way to recovery.</p>
                <p className="bobo3">Find the right cardiologist near you. Book an appointment today and be on your way to recovery.</p>
            </div>
            </div>
        </>
    )
}