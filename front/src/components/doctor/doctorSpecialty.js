import React, {useState, useEffect} from 'react'

export default function DoctorSpecialty(props){
    const {data, ParentFunction, doc_id} = props
    const [Specialty, setSpecialty] = useState([])
   
    const SpecialtyChangeHandler = (event, index) =>{
        const values = [...Specialty]
        values[index][event.target.name] = event.target.value
        setSpecialty(values)
        ParentFunction(values)
    }
    const removeSpecialtyFieldHandler = (index) =>{
        const values = [...Specialty]
        values.splice(index, 1)
        setSpecialty(values)
    }
    const addSpecialtyFieldHandler = () =>{
        setSpecialty([
            ...Specialty, 
            {
                special: "", 
                sub_special: "", 
                doctor_id: doc_id, 
                id: ""
            }
        ])
    }
    
    useEffect(()=>{
        if(data){
            data.map(values =>{
                setSpecialty(prevState => ([
                    ...prevState, 
                    {
                        special: values[2], 
                        sub_special: values[3],
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
                    <h6 className="mb-2 text-primary">Specialization</h6>
                </div>
                {
                    Specialty.map((value, index)=>(
                        <>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label htmlFor="fullName">Specialty</label>
                                <input type="text" className="form-control" id="fullName" name="special" value={value.special} onChange={(event)=>SpecialtyChangeHandler(event, index)}/>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label htmlFor="fullName">Sub-specialty</label>
                                <input type="text" className="form-control" id="fullName" name="sub_special" value={value.sub_special} onChange={(event)=>SpecialtyChangeHandler(event, index)}/>
                            </div>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="text-right">
                                <button type="button" onClick={()=>removeSpecialtyFieldHandler(index)} className="btn btn-danger" id="btn_doctorProfileSpace">Remove</button>
                                <button type="button" onClick={addSpecialtyFieldHandler} className="btn btn-success" id="colorBlue">Add Fields</button>
                            </div>
                            <hr></hr>
                        </div>
                  
                        </>
                    ))
                }
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="text-right">
                        <button type="button" onClick={addSpecialtyFieldHandler} className="btn btn-success" id="colorBlue">Add Fields</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}