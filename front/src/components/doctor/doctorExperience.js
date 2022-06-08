import React, {useEffect, useState} from 'react'

export default function DoctorExperience(props){
    
    const {data} = props
    const [Experience, setExperience] = useState([])
   
    const ExperienceChangeHandler = (event, index) =>{
        const values = [...Experience]
        values[index][event.target.name] = event.target.value
        setExperience(values)
    }
    const removeExperienceFieldHandler = (index) =>{
        const values = [...Experience]
        values.splice(index, 1)
        setExperience(values)
    }
    const addExperienceFieldHandler = () =>{
        setExperience([
            ...Experience, 
            {
                doctor_id: "", 
                special: "", 
                sub_special: "", 
               
            }
        ])
    }
    
    useEffect(()=>{
        if(data){
            data.map(values =>{
                setExperience(prevState => ([
                    ...prevState, 
                    {
                        doctor_id: values[0], 
                        place_of_work: values[1], 
                        position: values[2], 
                        years_of_experience: values[3],
                        last_date: values[4]
                    }
                ]))
            })
        }
    }, [data])
    return(
        <div className="pard">
        <div className="card-body">
            <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-2 text-primary">Experiences</h6>
                </div>
                {
                    Experience.map((value, index)=>(
                        <>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label htmlFor="fullName">Position</label>
                                <input type="text" className="form-control" id="fullName" name="position" value={value.position} onChange={(event)=>ExperienceChangeHandler(event, index)}/>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label htmlFor="fullName">Place of work</label>
                                <input type="text" className="form-control" id="fullName" name="place_of_work" value={value.place_of_work} onChange={(event)=>ExperienceChangeHandler(event, index)}/>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label htmlFor="fullName">Years of Experience</label>
                                <input type="text" className="form-control" id="fullName" name="years_of_experience" value={value.years_of_experience} onChange={(event)=>ExperienceChangeHandler(event, index)}/>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label htmlFor="fullName">Last Date to the company</label>
                                <input type="text" className="form-control" id="fullName" name="last_date" value={value.last_date} onChange={(event)=>ExperienceChangeHandler(event, index)}/>
                            </div>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="text-right">
                                <button type="button" onClick={()=>removeExperienceFieldHandler(index)} className="btn btn-danger">Remove</button>
                            </div>
                        </div>
                        <hr></hr>
                        </>
                    ))
                }
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="text-right">
                        <button type="button" onClick={addExperienceFieldHandler} className="btn btn-success">Add Fields</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )

    
}