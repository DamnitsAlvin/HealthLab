import React, {useState, useEffect} from 'react'

export default function DoctorTitles(props){
    const {data,ParentFunction} = props
    const [Titles, setTitles] = useState([])
   
    const TitlesChangeHandler = (event, index) =>{
        const values = [...Titles]
        values[index][event.target.name] = event.target.value
        setTitles(values)
        ParentFunction(Titles)
    }
    const removeTitlesFieldHandler = (index) =>{
        const values = [...Titles]
        values.splice(index, 1)
        setTitles(values)
    }
    const addTitlesFieldHandler = () =>{
        setTitles([
            ...Titles, 
            {
                title:"",  
            }
        ])
    }
    
    useEffect(()=>{
        if(data){
            data.map((values,index) =>{
                console.log("values: ", values, "Titles: ", Titles, " Index: ", index )
                setTitles(prevState => ([
                    ...prevState, 
                    {
                        title: values
                    }
                ]))
            })
            Titles.splice((Titles.length/2)-1)
        }
        ParentFunction(Titles)
    }, [data])
    console.log("length: ", Titles.length)
    //comment
    return(
        <div className="pard">
        <div className="card-body">
            <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-2 text-primary">Titles</h6>
                </div>
                {
                    Titles.map((value, index)=>(
                        <>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label htmlFor="fullName">Title</label>
                                <input type="text" className="form-control"  name="position" value={value.title} onChange={(event)=>TitlesChangeHandler(event, index)}/>
                            </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="text-right">
                                <button type="button" onClick={()=>removeTitlesFieldHandler(index)} className="btn btn-danger">Remove</button>
                            </div>
                        </div>
                        <hr></hr>
                        </>
                    ))
                }
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="text-right">
                        <button type="button" onClick={addTitlesFieldHandler} className="btn btn-success">Add Fields</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}