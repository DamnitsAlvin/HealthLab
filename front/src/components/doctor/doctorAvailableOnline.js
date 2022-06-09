import React, {useState, useEffect} from 'react'

export default function DoctorAvailableOnline(props){
    const {data, ParentFunction} = props
    const [AvailableOnline, setAvailableOnline] = useState([])
   
    const AvailableOnlineChangeHandler = (event, index) =>{
        const values = [...AvailableOnline]
        values[index][event.target.name] = event.target.value
        setAvailableOnline(values)
    }
    const removeAvailableOnlineFieldHandler = (index) =>{
        const values = [...AvailableOnline]
        values.splice(index, 1)
        setAvailableOnline(values)
        ParentFunction(AvailableOnline)
    }
    const addAvailableOnlineFieldHandler = () =>{
        setAvailableOnline([
            ...AvailableOnline, 
            {
                doctor_id: "", 
                day_from: "",
                day_to: "", 
                time_from: "",
                time_to: ""
               
            }
        ])
    }
    
    useEffect(()=>{
        if(data){
            data.map(values =>{
                setAvailableOnline(prevState => ([
                    ...prevState, 
                    {
                        doctor_id: values[0], 
                        day_from: values[1],
                        day_to: values[2], 
                        time_from: values[3],
                        time_to: values[4]
                    }
                ]))
            })
        }
        ParentFunction(AvailableOnline)
    }, [data])
   

    return(
        <div className="pard">
                <div className="card-body">
                    <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <h6 className="mb-2 text-primary">Available Online Information</h6>
                        </div>
                        {AvailableOnline.map((value, index)=>(
                            <>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="fullName">Available Day</label>
                                    <select className="form-control" value={value.day_from} name="day_from" onChange={(event)=>{AvailableOnlineChangeHandler(event, index)}}>
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
                                    
                                    <select className="form-control" value={value.day_to} onChange={(event)=>{AvailableOnlineChangeHandler(event, index)}}>
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
                                    <input className="form-control" type="time" value={value.time_from} name="time_from" onChange={(event)=>{AvailableOnlineChangeHandler(event, index)}} />
                                </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="fullName">To</label>
                                    <input className="form-control" type="time" value={value.time_to} name="time_to" onChange={(event)=>{AvailableOnlineChangeHandler(event, index)}} />
                                </div>
                            </div>
                            
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="text-right">
                                        <button type="button" onClick={()=>removeAvailableOnlineFieldHandler(index)} className="btn btn-danger">Remove</button>
                                    </div>
                            </div>
                            <hr></hr>
                            </>
                        ))}
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="text-right">
                                <button type="button" onClick={addAvailableOnlineFieldHandler} className="btn btn-success">Add Fields</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}