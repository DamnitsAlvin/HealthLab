import React, {useState, useEffect} from 'react'

export default function DoctorPersonal(props){
    const {data, ParentFunction, ParentFunction1} = props


    const [formState, setformState] = useState({
        doctor_id: "",
        first_name: "", 
        middle_name: "", 
        last_name: "", 
        suffix : "", 
        birthday: "", 
        phone: "", 
        email: '', 
        mode_of_consultation: "Virtual", 
        doctor_image: "", 
        password: "", 
    })

    const BasicFormFields = [
        "First Name", 
        "Middle Name",
        "Last Name", 
        "Suffix" , 
        "Birthday", 
        "Phone", 
        "Email", 
        "Mode of Consulation", 
        "Doctor Image",
        "Password"
    ]
    const BasicFormFields2 = Object.keys(formState)

    useEffect(()=>{
        setformState(data ? {
            doctor_id: data[0],
            first_name: data[1], 
            middle_name: data[2], 
            last_name: data[3], 
            suffix : data[4], 
            birthday:data[5], 
            phone: data[6], 
            email: data[7], 
            mode_of_consultation: data[8], 
            doctor_image: data[10], 
            password: data[11],   
        }: {} )
        
    }, [data])
    
 
    const BasicInfoChangeHandler = async(event, index) =>{
        setformState({
            ...formState, 
            [BasicFormFields2[index+1]]: event.target.value
        })
        setformState((formState)=>{
            ParentFunction(formState)
            return formState; 
        })
        
    }
    const fileChange = (event, index) =>{
        const extension = event.target.files[0].name.split(".")[1]
        const filename = formState.doctor_id + "Image." +extension
        setformState({
            ...formState, 
            [BasicFormFields2[index+1]]: "/uploads/"+filename
        })
        setformState((formState)=>{
            ParentFunction(formState)
            return formState; 
        })
        ParentFunction1(event.target.files[0])
    }
    
    return(
        <div className="pard_2">
                <div className="card-body">
                    <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <h6 className="mb-2 text-primary"><i class="fa fa-address-book-o" aria-hidden="true"id="fontawesomeSpace"></i>Personal Details</h6>
                        </div>
                        <form method="post">
                        {BasicFormFields.map((value, index)=>(
                            index == 4 ? (
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                                <div className="form-group">
                                    <label >{value}</label>
                                    <input type="date" className="form-control"  onChange={(event)=>BasicInfoChangeHandler(event, index)} value={formState[BasicFormFields2[index+1]]} />
                                </div>
                            </div>
                            ) :
                            index==5 ? (
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                                <div className="form-group">
                                    <label htmlFor="fullName">{value}</label>
                                    <input type="text" className="form-control" placeholder="&#xf095; xxxx-xxx-xxxx" onChange={(event)=>BasicInfoChangeHandler(event, index)} pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}" value={formState[BasicFormFields2[index+1]]} />      
                                </div>
                            </div>
                            ): 
                            index==7 ? (
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                                <div className="form-group">
                                    <label htmlFor="fullName">{value}</label>
                                    <select className="form-control"  onChange={(event)=>BasicInfoChangeHandler(event, index)} value={formState[BasicFormFields2[index+1]]}>
                                        <option value="0">&#xf03d; Virtual</option>
                                        <option value="1">&#xf500; Face to Face</option>
                                        <option value="2">&#xf0c0; Both</option>
                                    </select>
                                </div>
                                </div>
                            ):
                            index==8 ? (<>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                                    <div className="form-group">
                                        <label htmlFor="fullName">{value}</label>
                                        <input type="file" className="form-control"  onChange={event => fileChange(event, index)}  />
                                    </div>
                                </div>
                            </>) : 
                            index==9 ? (
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                                <div className="form-group">
                                    <label htmlFor="fullName">{value}</label>
                                    <input type="password" className="form-control" onChange={(event)=>BasicInfoChangeHandler(event, index)} value={formState[BasicFormFields2[index+1]]} />
                                </div>
                            </div>
                            ) : 
                            ( 
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                                <div className="form-group">
                                    <label htmlFor="fullName">{value}</label>
                                    <input type="text" className="form-control" onChange={(event)=>BasicInfoChangeHandler(event, index)} value={formState[BasicFormFields2[index+1]]} />
                                </div>
                            </div>)
                        

                        ))} 

                        </form>
                    </div>
                </div>
            </div>
    )

}