import React, {useState, useEffect} from 'react'

export default function DoctorAvailableOffline(props){
    const {address, time, ParentFunction1, ParentFunction2} = props
    const [Address, setAddress] = useState([])
    const [Time, setTime] = useState([])

    const AvailableOfflineChangeHandler = (event, index) =>{
        const values = [...Address]
        values[index][event.target.name] = event.target.value
        setAddress(values)
        ParentFunction1(Address)
    }
    const removeAvailableOfflineFieldHandler = (index) =>{
        const values = [...Address]
        values.splice(index, 1)
        setAddress(values)
    }
    const addAvailableOfflineFieldHandler = () =>{
        setAddress([
            ...Address, 
            {
                doctor_id: "",
                address_id: "", 
                address_line_1: "", 
                barangay: "", 
                city: "", 
                province: "", 
                zip_code: "" 
               
            }
        ])
    }
    const addTime = (index) =>{
        setTime([
            ...Time, 
            {
                doctor_id: "",
                address_id: Address[index].address_id ,
                day_from: "",
                day_to: "", 
                time_from: "",
                time_to: ""
            }
        ])
    }
    const removeTime = (index) =>{
        const values = [...Time]
        values.splice(index, 1)
        setTime(values)
    }
    const handleTimeChange = (event, index) =>{
        const values = [...Time]
        values[index][event.target.name] = event.target.value
        setTime(values)
        ParentFunction2(Time)
    }
    
    useEffect(()=>{
        if(address){
            address.map(values =>{
                setAddress(prevState => ([
                    ...prevState, 
                    {
                        doctor_id: values[0],
                        address_id: values[1], 
                        address_line_1: values[2], 
                        barangay: values[3], 
                        city: values[4], 
                        province: values[5], 
                        zip_code: values[6] 
                    }
                ]))
            })
        }
        if(time){
            time.map(values=>{
                setTime(prevState=>(
                    [
                        ...prevState, 
                        {
                            doctor_id: values[0],
                            address_id: values[1],
                            day_from: values[2],
                            day_to: values[3], 
                            time_from: values[4],
                            time_to: values[5]
                        }
                    ]
                ))
            })
        }
        
    }, [address, time,])
   

    return(
        <div className="pard_4">
                <div className="card-body">
                    <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <h6 className="mb-2 text-primary">Available Offline Information</h6>
                        </div>
                        {Address.map((value, index)=>(
                            <>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="form-group">
                                    <label htmlFor="fullName">Address</label>
                                    <input type="text" className="form-control" id="fullName" value={value.address_line_1} name='address_line_1' onChange={(event)=>{AvailableOfflineChangeHandler(event, index)}} />
                                </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="fullName">Barangay</label>
                                    <input type="text" className="form-control" id="fullName" value={value.barangay} name='barangay' onChange={(event)=>{AvailableOfflineChangeHandler(event, index)}} />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="fullName">City</label>
                                    <input type="text" className="form-control" id="fullName" value={value.city} name='city' onChange={(event)=>{AvailableOfflineChangeHandler(event, index)}} />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="fullName">Province</label>
                                    <input type="text" className="form-control" id="fullName" value={value.province} name='province' onChange={(event)=>{AvailableOfflineChangeHandler(event, index)}} />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="fullName">Zip Code</label>
                                    <input type="text" className="form-control" id="fullName" value={value.zip_code} name='zip_code' onChange={(event)=>{AvailableOfflineChangeHandler(event, index)}} />
                                </div>
                            </div>
                            <hr></hr>
                            {Time.map((val,index)=>(
                                val.address_id == value.address_id ? (
                                    <>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="fullName">Available Day</label>
                                            <select className="form-control" value={val.day_from} name="day_from" onChange={(event)=>{handleTimeChange(event,index)}}>
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
                                            <select className="form-control" value={val.day_to} onChange={(event)=>{handleTimeChange(event,index)}}>
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
                                            <input className="form-control" type="time" value={val.time_from} name="time_from" onChange={(event)=>{handleTimeChange(event,index)}}/>
                                        </div>
                                    </div>

                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="fullName">To</label>
                                            <input className="form-control" type="time" value={val.time_to} name="time_to" onChange={(event)=>{handleTimeChange(event,index)}}/>
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="text-right">
                                                <button type="button" className="btn btn-danger" onClick={()=>{removeTime(index)}}>Remove Time</button>
                                            </div>
                                            <hr></hr>
                                    </div>
                                   
                                    </>
                                ) : (<></>)
                            ))}
                           <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="text-right">
                                    <button type="button" className="btn btn-success" onClick={()=>{addTime(index)}}>Add Time</button>
                                    <button type="button" id="kags" onClick={()=>removeAvailableOfflineFieldHandler(index)} className="btn btn-warning">Remove Address</button>
                                    
                                </div>
                                <hr></hr>
                            </div> 
                           
                          
                            </>
                        ))}
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="text-right">
                                <button type="button" onClick={addAvailableOfflineFieldHandler} className="btn btn-success">Add Address Fields</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}