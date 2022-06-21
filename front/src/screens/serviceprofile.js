import axios from 'axios'
import React, { useEffect, useState} from 'react'
import { useSelector } from 'react-redux'

export default function ServiceProfile(){
    const getuserInfo = useSelector(x=>x.userSignIn)
    const {userInfo} = getuserInfo

    const [serviceInfo, setserviceInfo] = useState()
    const [time, settime] = useState()
    const [location, setlocation] = useState([])
    const [payment, setpayment] = useState()
    const [offered, setoffered] = useState()

    useEffect( async()=>{
        const {data} = await axios.get(`http://localhost:5000/api/serviceInfo?service_id=${userInfo.data[0]}`)
        if(data){
            setserviceInfo(data.service_info)
            settime(data.available_time ? data.available_time: [])
            setlocation(data.location ? data.location: [])
            setpayment(data.payment ? data.payment: [])
            setoffered(data.service_offered ? data.service_offered: [])
        }
    }, [userInfo])
    
    // console.log(serviceInfo)
    // console.log(time)
    // console.log(location)
    console.log(payment)
    // console.log(offered)
    const labels = [
        "Service ID", 
        'Service Name', 
        '',
        'Email', 
        'Password', 
        'Image'
    ]
    const generateAddressId = () =>{
        const date = new Date()
        const add = "ADD" + date.getSeconds() + date.getMilliseconds() + date.getMinutes()
        return add
    }

    const removeTimeHandler = (index) =>{
        const values = [...time]
        values.splice(index,1)
        settime(values)
    }
    const removelocationHandler = (index) =>{
        const values = [...location]
        values.splice(index,1)
        setlocation(values)
    }
    const removeofferedHandler = (index) =>{
        const values = [...offered]
        values.splice(index,1)
        setoffered(values)
    }
    const removepaymentHandler = (index) =>{
        const values = [...payment]
        values.splice(index,1)
        setpayment(values)
    }
    
    const addTimeHandler = () =>{
        const values = [...time]
        values.push([userInfo.data[0], "", "","", "",""])
        settime(values)
    }
    const addofferedHandler = () =>{
        const values = [...offered]
        values.push([userInfo.data[0],"","", "",""])
        setoffered(values)
    }

    const addpaymentHandler = () =>{
        const values = [...payment]
        values.push([userInfo.data[0],"", "",""])
        setpayment(values)
    }
    
    const addlocationHandler = () =>{
        const values = [...location]
        const id = generateAddressId()
        values.push([userInfo.data[0], id , "","", "","", ""])
        setlocation(values)
    }
    

    const timeChangeHandler = (event, index, index1) =>{
        const values = [...time]
        values[index][index1] = event.target.value
        settime(values)
    }
    
    const locationChangeHandler = (event, index, index1) =>{
        const values = [...location]
        values[index][index1] = event.target.value
        setlocation(values)
    }
    const offeredChangeHandler = (event, index, index1) =>{
        const values = [...offered]
        values[index][index1] = event.target.value
        setoffered(values)
    }

    const paymentChangeHandler = (event, index, index1) =>{
        const values = [...payment]
        values[index][index1] = event.target.value
        setpayment(values)
    }



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
                                    <input type="file" className="form-control"/>
                                </div>
                            </div>
                            ): index==4 ? (
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                                <div className="form-group">
                                    <label >{labels[index]}</label>
                                    <input type="password" className="form-control"  value={value} />
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
                                    <select className="form-control" value={value[4]} name="day_from" onChange={(event)=>{timeChangeHandler(event, index, 4)}}>
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
                                    <select className="form-control" value={value[5]} onChange={(event)=>{timeChangeHandler(event, index, 5)}} >
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
                                    <input className="form-control" type="time" value={value[2]} name="time_from" onChange={(event)=>{timeChangeHandler(event, index, 2)}} />
                                </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="fullName">To</label>
                                    <input className="form-control" type="time" value={value[3]} name="time_to" onChange={(event)=>{timeChangeHandler(event, index, 3)}}/>
                                </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="text-right">
                                    <button type="button" className="btn btn-danger" onClick={()=>{removeTimeHandler(index)}}>Remove Time</button>
                                </div>
                            </div>
                            <hr></hr>
                            </>
                    ))
                }  
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="text-right">
                        <button type="button" className="btn btn-success"id="colorBlue" onClick={()=>{addTimeHandler()}}>Add Time</button>
                    </div>
                    <hr></hr>
                </div> 

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
                            <input className="form-control" type="text" value={values[2]} onChange={(event)=> locationChangeHandler(event, index, 2)}/>
                        </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="fullName">Barangay</label>
                            <input className="form-control" type="text" value={values[3]} onChange={(event)=> locationChangeHandler(event, index, 3)}/>
                        </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="fullName">Municipality</label>
                            <input className="form-control" type="text" value={values[4]} onChange={(event)=> locationChangeHandler(event, index, 4)}/>
                        </div>
                    </div>
                    
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="fullName">Province</label>
                            <input className="form-control" type="text" value={values[5]} onChange={(event)=> locationChangeHandler(event, index, 5)}/>
                        </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="fullName">Zip Code</label>
                            <input className="form-control" type="text" value={values[6]} onChange={(event)=> locationChangeHandler(event, index, 6)}/>
                        </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="text-right">
                            <button type="button" className="btn btn-danger" onClick={()=>{removelocationHandler(index)}}>Remove Location</button>
                        </div>
                    </div>
                    <hr></hr>

                    </>
                   ))
                }  
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="text-right">
                        <button type="button" className="btn btn-success"id="colorBlue" onClick={addlocationHandler}>Add Location</button>
                    </div>
                    <hr></hr>
                </div> 
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
                            <label htmlFor="fullName">Service Name</label>
                            <input className="form-control" type="text" value={values[1]} onChange={(event)=> offeredChangeHandler(event, index, 1)}/>
                        </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="fullName">Service Cost</label>
                            <input className="form-control" type="text" value={values[2]} onChange={(event)=> offeredChangeHandler(event, index, 2)}/>
                        </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="fullName">Service Waiting Time</label>
                            <input className="form-control" type="text" value={values[3]} onChange={(event)=> offeredChangeHandler(event, index, 3)}/>
                        </div>
                    </div>
                    
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="fullName">Description</label>
                            <input className="form-control" type="text" value={values[4]} onChange={(event)=> offeredChangeHandler(event, index, 4)}/>
                        </div>
                    </div>

                   
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="text-right">
                            <button type="button" className="btn btn-danger" onClick={()=>{removeofferedHandler(index)}}>Remove Service Offered</button>
                        </div>
                    </div>
                    <hr></hr>

                    </>
                   ))
                }  
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="text-right">
                        <button type="button" className="btn btn-success"id="colorBlue" onClick={addofferedHandler}>Add Service Offered</button>
                    </div>
                    <hr></hr>
                </div> 
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
                            <input className="form-control" type="text" value={values[1]} onChange={(event)=> paymentChangeHandler(event, index, 1)}/>
                        </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="fullName">Reference Name</label>
                            <input className="form-control" type="text" value={values[2]} onChange={(event)=> paymentChangeHandler(event, index, 2)}/>
                        </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="fullName">Reference Number</label>
                            <input className="form-control" type="text" value={values[3]} onChange={(event)=> paymentChangeHandler(event, index, 3)}/>
                        </div>
                    </div>
                    
                    

                   
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="text-right">
                            <button type="button" className="btn btn-danger" onClick={()=>{removepaymentHandler(index)}}>Remove Payment Offered</button>
                        </div>
                    </div>
                    <hr></hr>

                    </>
                   ))
                }  
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="text-right">
                        <button type="button" className="btn btn-success"id="colorBlue" onClick={addpaymentHandler}>Add Payment Offered</button>
                    </div>
                    <hr></hr>
                </div> 
            </div>
          


                <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="text-right">  
                            <button type="button" id="submit" name="submit" className="btn btn-primary">Update</button>
                        </div>
                    </div>
                </div>
        
            </div>
        </div>
        </div>
        
        </div>
        </div>
    )
}