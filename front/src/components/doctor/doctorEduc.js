import React, {useEffect, useState} from 'react'

export default function DoctorEduc(props){
    const {data, ParentFunction, doc_id} = props

    const [Educ, setEducation] = useState([])
    const EducChangeHandler = (event, index) =>{
        const values = [...Educ]
        values[index][event.target.name] = event.target.value
        setEducation(values)
        ParentFunction(values)
    }
    const addEducFieldHandler = () =>{
        setEducation([...Educ, {
            school_type: "Residence", 
            school_name: "", 
            graduation_date: "", 
            degree: "Bachelor", 
            course: "",
            doctor_id: doc_id, 
            id: ""
        }])
    }
    const removeEducFieldHandler = (index) =>{
        const values = [...Educ]
        values.splice(index, 1)
        setEducation(values)
        ParentFunction(values)
    }
    useEffect(()=>{
        if(data){
            data.map(value => {
                setEducation(prevState => ([
                    ...prevState, 
                   {
                    school_type: value[2], 
                    school_name: value[3], 
                    graduation_date: value[4], 
                    degree: value[5], 
                    course: value[6],
                    doctor_id: value[0],
                    id: value[1]
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
                            <h6 className="mb-2 text-primary"><i class="fa fa-book" aria-hidden="true"id="fontawesomeSpace"></i>Education</h6>
                        </div>
                        {Educ.map((value, index)=>(
                            <div key={index}>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" >
                                <div className="form-group">
                                    <label htmlFor="fullName">School Type</label>
                                    <select className="form-control" value={value.school_type} name='school_type' onChange={(event)=>EducChangeHandler(event, index)}>
                                        <option value="Residence">&#xf03d; Residence</option>
                                        <option value="Medical School">&#xf500; Medical School</option>
                                        <option value="Training">&#xf0c0; Training</option>
                                    </select>                            
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" >
                                <div className="form-group">
                                    <label htmlFor="fullName">Degree</label>
                                    <select className="form-control" value={value.degree} name='degree' onChange={(event)=>EducChangeHandler(event, index)}>
                                        <option value="Bachelor">&#xf03d; Bachelor</option>
                                        <option value="Masteral">&#xf500; Masteral</option>
                                        <option value="Doctorate">&#xf0c0; Doctorate</option>
                                    </select>                            
                                </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="form-group">
                                    <label htmlFor="fullName">Graduation Date</label>
                                    <input type="date" className="form-control"  value={value.graduation_date} name='graduation_date' onChange={(event)=>EducChangeHandler(event, index)}/>
                                </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="form-group">
                                    <label htmlFor="fullName">School Name</label>
                                    <input type="text" className="form-control"  value={value.school_name} name='school_name' onChange={(event)=>EducChangeHandler(event, index)}/>
                                </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="form-group">
                                    <label htmlFor="fullName">Course</label>
                                    <input type="text" className="form-control"  value={value.course} name='course' onChange={(event)=>EducChangeHandler(event, index)} />
                                </div>
                            </div>
                            
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="text-right">
                                        <button type="button" onClick={()=>removeEducFieldHandler(index)} className="btn btn-danger">Remove</button>
                                    </div>
                                    <hr></hr>
                                </div>
         

                            </div>
                    

                        ))}
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="text-right">
                                <button type="button" onClick={addEducFieldHandler} className="btn btn-success" id="colorBlue">Add Fields</button>
                            </div>
                        </div>
                    </div> 
                </div>
            </div> 
    )
}