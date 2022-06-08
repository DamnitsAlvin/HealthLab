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
                doctor_id: data[0][0], 
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
                        special: values[1], 
                        sub_special: values[2]
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
                    <h6 className="mb-2 text-primary">Specialization</h6>
                </div>
                {
                    Experience.map((value, index)=>(
                        <>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label htmlFor="fullName">Experience</label>
                                <input type="text" className="form-control" id="fullName" name="special" value={value.special} onChange={(event)=>SpecialtyChangeHandler(event, index)}/>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label htmlFor="fullName">Sub-Experience</label>
                                <input type="text" className="form-control" id="fullName" name="sub_special" value={value.sub_special} onChange={(event)=>ExperienceChangeHandler(event, index)}/>
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