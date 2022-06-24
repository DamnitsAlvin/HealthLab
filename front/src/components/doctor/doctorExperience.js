import React, {useEffect, useState} from 'react'

export default function DoctorExperience(props){
    
    const {data, ParentFunction, doc_id} = props
    const [Experience, setExperience] = useState([])
   
    const ExperienceChangeHandler = (event, index) =>{
        const values = [...Experience]
        values[index][event.target.name] = event.target.value
        setExperience(values)
        ParentFunction(values)
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
                place_of_work: "", 
                position: "", 
                years_of_experience: "",
                last_date: "", 
                doctor_id: doc_id, 
                id: ""
            }
        ])
    }
    
    useEffect(()=>{
        if(data){
            data.map(values =>{
                setExperience(prevState => ([
                    ...prevState, 
                    {
                        place_of_work: values[2], 
                        position: values[3], 
                        years_of_experience: values[4],
                        last_date: values[5], 
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
                    <h6 className="mb-2 text-primary"><i class="fa fa-hospital-o" aria-hidden="true"id="fontawesomeSpace"></i>Experiences</h6>
                </div>
                {
                    Experience.map((value, index)=>(
                        <>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label htmlFor="fullName">Position</label>
                                <input type="text" className="form-control"  name="position" value={value.position} onChange={(event)=>ExperienceChangeHandler(event, index)}/>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label htmlFor="fullName">Place of work</label>
                                <input type="text" className="form-control"  name="place_of_work" value={value.place_of_work} onChange={(event)=>ExperienceChangeHandler(event, index)}/>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label htmlFor="fullName">Years of Experience</label>
                                <input type="text" className="form-control"  name="years_of_experience" value={value.years_of_experience} onChange={(event)=>ExperienceChangeHandler(event, index)}/>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label htmlFor="fullName">Last Date to the company</label>
                                <input type="date" className="form-control"  name="last_date" value={value.last_date} onChange={(event)=>ExperienceChangeHandler(event, index)}/>
                            </div>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="text-right">
                                <button type="button" onClick={()=>removeExperienceFieldHandler(index)} className="btn btn-danger">Remove</button> 

                                <hr></hr>
                                
                                
                            </div>
                        </div>
                        <hr></hr>
                        </>
                    ))
                }
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="text-right">
                        <button type="button" onClick={addExperienceFieldHandler} className="btn btn-success" id="colorBlue">Add Fields</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )

    
}