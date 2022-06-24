import React, { useEffect, useState } from 'react'; 
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {getDoctor} from "../actions/doctorActions"

export default function DoctorScreen(){
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
                if(val[1].substring(0, event.target.value.length).toLowerCase() == event.target.value.toLowerCase() || val[3].substring(0, event.target.value.length).toLowerCase() == event.target.value.toLowerCase()){
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
            <div classNameName="wow fadeInDown" data-wow-delay="0.1s">
            <div className="s003">
                <form>
                <div className="inner-form">

                    <div className="input-field first-wrap">
                        <div className="input-select">
                        <select data-trigger="" name="choices-single-defaul"id="butones" onChange={dropdownHandler} value={category}>
                            <option>General Medicine</option>
                            <option>Neurology</option>
                            <option>Heart and Cardiology</option>
                            <option>Kidney and Urine</option>
                            <option>OBGYNE</option>
                            <option>Optalmology</option>
                            <option>Dermatology</option>
                            <option>Dentistry</option>
                        </select>
                        </div>
                    </div>

                    <div className="input-field second-wrap">
                        <input id="search" type="text" placeholder="Looking for something?" onChange={searchHandler}/>
                    </div>

                    <div className="input-field third-wrap">
                        <button className="btn-search" type="button">
                        <svg className="svg-inline--fa fa-search fa-w-16" aria-hidden="true" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                        </svg>
                        </button>
                    </div>
                   
                </div>
                </form>
            </div>

            <div className="wrapper-grid">
                {
                    docToDisp ? docToDisp.map( (values) =>( 
                        <div className="cardo">
                            <p className="price" onClick={()=>{viewDoctorHander(values[0])}}>View</p>
                            <p className="online">Active</p>
                            <img src={values[10] ? values[10]: "https://bootdey.com/img/Content/avatar/avatar7.png"} alt='profile image' className="profile-img"/>
                            <h1 className='name'id='nametag'>Dr. {`${values[1]} ${values[2]} ${values[3]} `}</h1>
                            <p className='occupation'id='occupations'>{ doctors && doctors.titles.map((x)=>{
                                if(x[0] == values[0]){
                                    return x[1];
                                }
                            }).join("/")}</p>
                            <div className="skills">
                                <a href="#" className="skill">General Medicine</a>
                                <a href="#" className="skill">Dentistry</a>
                                <a href="#" className="skill">Dermatologist</a>
                            </div>
                            <p className="about">{values[8] == 0 ? "Online Consulation only" : 
                                                    values[8] == 1 ? "Face to Face Consulation only": 
                                                    "Face to Face/Online Consulation"}
                            </p>
                            <p className="about2" >June 27, 12pm-1pm</p>
                            <button className='tanginamo' onClick={(evt)=>{bookDoctorHandler(values[0], values[8])}}>Book Doctor</button>
                        </div>
                    )):(<></>)
                }
               
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
                <p className="bobo">Find the Right Doctor </p>
                <p className="bobo2">Find the right Doctor near you. Book an appointment today and be on your way to recovery.</p>
            </div>
            </div>
        </>
    )
}