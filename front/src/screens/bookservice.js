import axios from 'axios'
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export default function BookServiceProfile(){
    const {id} = useParams()


    const [serviceInfo, setserviceInfo] = useState()
    const [time, settime] = useState()
    const [location, setlocation] = useState([])
    const [payment, setpayment] = useState()
    const [offered, setoffered] = useState()

    const dispatch = useDispatch()

    useEffect( async()=>{
        const {data} = await axios.get(`http://localhost:5000/api/serviceInfo?service_id=${id}`)
        if(data){
            setserviceInfo(data.service_info)
            settime(data.available_time ? data.available_time: [])
            setlocation(data.location ? data.location: [])
            setpayment(data.payment ? data.payment: [])
            setoffered(data.service_offered ? data.service_offered: [])
        }
    }, [])

   

       
        // console.log(serviceInfo)
        // console.log(time)
        // console.log(location)
        // console.log(payment)
        // console.log(offered)
    
    const labels = [
        "Service ID", 
        'Service Name', 
        '',
        'Email', 
        'Password', 
        'Image'
    ]
   


    return(
        <div className="container">  
        <div className="row gutters">

        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6 ">
            <div className="pard h-100">
            
                <div className="card-body">
                    <div className="account-settings">
                        <div className="user-profile">
                            <div className="user-avatar">
                                <img src={serviceInfo && serviceInfo[5] ? serviceInfo[5] : "https://bootdey.com/img/Content/avatar/avatar7.png" }alt="Maxwell Admin"/>
                            </div>
                            <h3 className="user-name">{serviceInfo && serviceInfo[1]}</h3>
                            <h4 className="user-email">{serviceInfo && serviceInfo[3]}</h4>
                            <h5 className="user-email">{serviceInfo && serviceInfo[0]}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    <div className="col-xl-8 col-lg-8 col-md-10 col-sm-10 col-10">
        <div className="pard_4">
            <div className="card-body">
                <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h6 className="mb-2 text-primary">Service Information</h6>
                    </div>
                    {
                        serviceInfo && serviceInfo.map((value,index)=>(
                            index == 0 ? (
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                                <div className="form-group">
                                    <label >{labels[index]}</label>
                                    <input type="text" className="form-control"  value={value} disabled />
                                </div>
                            </div>
                            ): index==2 || index== 6 ?(
                                <></>
                            ): index==5 ? (
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                                <div className="form-group">
                                    <label >{labels[index]}</label>
                                    <input type="file" className="form-control" accept="image/*" />
                                </div>
                            </div>
                            ): index==4 ? (
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                                <div className="form-group">
                                    <label >{labels[index]}</label>
                                    <input type="password" className="form-control"  value={value}/>
                                </div>
                            </div>
                            ): (
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                                <div className="form-group">
                                    <label >{labels[index]}</label>
                                    <input type="text" className="form-control"  value={value}/>
                                </div>
                            </div>
                            )
                        ))
                    }     
                </div>
            </div>
        </div>

        <div className="pard_4">
            <div className="card-body">
                <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h6 className="mb-2 text-primary">Service Available Time</h6>
                    </div>
                    {
                    time && time.map((value,index)=>(
                        <>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="fullName">Available Day</label>
                                    <select className="form-control" value={value[4]} name="day_from">
                                        <option value="Monday">Monday</option>
                                        <option value="Tuesday">Tuesday</option>
                                        <option value="Wednesday">Wednesday</option>
                                        <option value="Thursday">Thursday</option>
                                        <option value="Friday">Friday</option>
                                        <option value="Saturday">Saturday</option>
                                        <option value="Sunday">Sunday</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="fullName">To</label>
                                    <select className="form-control" value={value[5]} >
                                        <option value="Monday">Monday</option>
                                        <option value="Tuesday">Tuesday</option>
                                        <option value="Wednesday">Wednesday</option>
                                        <option value="Thursday">Thursday</option>
                                        <option value="Friday">Friday</option>
                                        <option value="Saturday">Saturday</option>
                                        <option value="Sunday">Sunday</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="fullName">Available Time</label>
                                    <input className="form-control" type="time" value={value[2]} name="time_from" />
                                </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="fullName">To</label>
                                    <input className="form-control" type="time" value={value[3]} name="time_to"/>
                                </div>
                            </div>
                           
                            <hr></hr>
                            </>
                    ))
                }  
            
            </div>
        </div>
    </div>


    <div className="pard_4">
            <div className="card-body">
                <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h6 className="mb-2 text-primary">Location</h6>
                    </div>
                {
                   location && location.map((values,index)=>(
                    <>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="fullName">Address</label>
                            <input className="form-control" type="text" value={values[2]} />
                        </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="fullName">Barangay</label>
                            <input className="form-control" type="text" value={values[3]}/>
                        </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="fullName">Municipality</label>
                            <input className="form-control" type="text" value={values[4]}/>
                        </div>
                    </div>
                    
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="fullName">Province</label>
                            <input className="form-control" type="text" value={values[5]}/>
                        </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="fullName">Zip Code</label>
                            <input className="form-control" type="text" value={values[6]}/>
                        </div>
                    </div>
                   

                    </>
                   ))
                }  
          
            </div>
            </div>
        </div>
        
        <div className="pard_4">
            <div className="card-body">
                <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h6 className="mb-2 text-primary">Service Offered</h6>
                    </div>
                {
                   offered && offered.map((values,index)=>(
                    <>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="fullName">Service Type</label>
                            <select value ={values[1]} className="form-control">
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

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="fullName">Service Cost</label>
                            <input className="form-control" type="text" value={values[2]}/>
                        </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="fullName">Service Waiting Time</label>
                            <input className="form-control" type="text" value={values[3]}/>
                        </div>
                    </div>
                    
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="fullName">Description</label>
                            <input className="form-control" type="text" value={values[4]}/>
                        </div>
                    </div>
                    </>
                   ))
                }  
            
            </div>
            </div>
        </div>

        <div className="pard_4">
            <div className="card-body">
                <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h6 className="mb-2 text-primary">Service Payment Options</h6>
                    </div>
                {
                   payment && payment.map((values,index)=>(
                    <>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="fullName">Payment Mode</label>
                            <input className="form-control" type="text" value={values[1]}/>
                        </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="fullName">Reference Name</label>
                            <input className="form-control" type="text" value={values[2]}/>
                        </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="fullName">Reference Number</label>
                            <input className="form-control" type="text" value={values[3]}/>
                        </div>
                    </div>

                    </>
                   ))
                }  

                <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="text-right">  
                            <button type="button" className="btn btn-primary" >Book Now</button>
                        </div>
                    </div>
                </div>
        
            </div>
        </div>
        </div>
        
        </div>
        </div>
    </div>
    );
}