import { useState } from "react";
import Accordion from "../components/accordion"

export default function RegisterDoctor(){
    const[tabPills, settabPills] = useState([])
    const [formState, setformState] = useState({
        first_name: "", 
        middle_name: "", 
        last_name: "", 
        suffix : "", 
        birthday: "", 
        phone: "", 
        email: '', 
        mode_of_consultation: "", 
        doctor_image: "", 
        password: "", 
    })

    const [educ, setEduc] = useState({
        Degree: "", 
        Course: "", 
        School_name: "", 
        Grad_date: ""
    })

    const [specialty, setSpecialty] = useState({
        specialization: "", 
        sub_specialization: ""
    })

    if(educ){
        console.log(educ)
    }
    const specializationHandler = (event) =>{
        setSpecialty({
            ...specialty, 
            [event.target.name] : event.target.value
        })
    }
    const EducInformationInputHandler = (event) =>{
        setEduc({
            ...educ,
            [event.target.name]:event.target.value
        })
    }

    const BasicInformationInputHandler = (event) =>{
        setformState({
            ...formState, 
            [event.target.name] : event.target.value
        })
    }
    const submitHandler = () =>{
        
    }


    return(
        <form method="post">
            <div className="centerContainer">
                <Accordion title="Basic Information" active={true}>
                <div className="form-group">
                    <div className="row">
                        <div className="col-xs-6"><input type="text" className="form-control" name="first_name" placeholder="First Name" onChange={BasicInformationInputHandler}/></div>
                        <div className="col-xs-6"><input type="text" className="form-control" name="middle_name" placeholder="Middle Name" onChange={BasicInformationInputHandler}/></div>  
                    </div>        	
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-xs-6"><input type="text" className="form-control" name="last_name" placeholder="Last Name"  required="required" onChange={BasicInformationInputHandler}/></div>
                        <div className="col-xs-6"><input type="text" className="form-control" name="suffix" placeholder="Suffix" onChange={BasicInformationInputHandler}/></div>  
                    </div>        	
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" name="phone" placeholder="xxxx-xxx-xxxx" pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}" required onChange={BasicInformationInputHandler}/>      
                </div>
                <div className="form-group">
        	        <input type="email" className="form-control" name="email" placeholder="Email"  required="required" onChange={BasicInformationInputHandler}/>
                </div>

                <div className="form-group">
                    <input type="date" className="form-control" name="birthday" placeholder="Birthday" onChange={BasicInformationInputHandler}/>
                </div>

                <div className="form-group">
                        <label className="col-form-label col-4">Mode of Consultation</label>
                        <select className="form-control" name="mode_of_consultation" onChange={BasicInformationInputHandler}>
                            <option value="Virtual">Virtual</option>
                            <option value="Face to Face">Face to Face</option>
                            <option value="Both">Both</option>
                        </select>
                </div>

                <div className="form-group">
                    <label className="col-form-label col-4">Select an image</label>    
                    <div className="row">
                        <div className="col-xs-12"><input type="file" className="form-control" name="doctor_image" placeholder="Zipcode" onChange={BasicInformationInputHandler}/></div>
                    </div>        	
                </div>

                <div className="form-group">
                <label className="col-form-label col-4">Password</label>    
                    <div className="row">
                        <div className="col-xs-12"><input type="password" className="form-control" name="password" placeholder="Password" onChange={BasicInformationInputHandler} /></div>
                    </div> 
                </div>
            

                </Accordion>
                <Accordion title="Educational Attainment">
                    <div className="form-group">
                         <div className="col-xs-6">
                            <label className="col-form-label col-4">Degree</label>
                            <select className="form-control" name="Degree" onChange={EducInformationInputHandler}>
                                <option value="Undergraduate">Undergraduate</option>
                                <option value="Bachelor">Bachelor</option>
                                <option value="Masteral">Masteral</option>
                                <option value="Doctorate">Doctorate</option>
                            </select>
                        </div>
                        
                        <div className="col-xs-6">
                            <label className="col-form-label col-4">Course  </label>
                            <input type="text" className="form-control " name="Course" placeholder="Course"  required="required" onChange={EducInformationInputHandler}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-xs-6">
                            <label className="col-form-label col-4">School </label>
                            <input type="text" className="form-control  col-xs-12" name="School_name" placeholder="School name"  required="required" onChange={EducInformationInputHandler}/>
                        </div>
                        <div className="col-xs-6">
                            <label className="col-form-label col-4">Graduation Date</label>
                            <input type="date" className="form-control" name="Grad_date" placeholder="Graduation" onChange={EducInformationInputHandler}/>
                        </div>
                    </div>
                </Accordion>

                <Accordion title="Specialization">
                    <div className="form-group">
                        <div className="col-xs-6">
                            <label className="col-form-label col-4">Specialty</label>
                            <input type="text" className="form-control " onChange={specializationHandler} name="specialization" placeholder="Specialty"  required="required" />
                         </div>
                        
                        <div className="col-xs-6">
                            <label className="col-form-label col-4">Sub-specialization </label>
                            <input type="text" className="form-control " onChange={specializationHandler} name="sub_specialization" placeholder="Sub-specialization"  required="required" />
                        </div>
                    </div>
                </Accordion>
                <input type="submit" className=""></input>
            </div>
          
        </form>
    );
}