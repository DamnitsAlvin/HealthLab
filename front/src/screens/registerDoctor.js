import { useState } from "react";
import Accordion from "../components/accordion"

export default function RegisterDoctor(){
    const[tabPills, settabPills] = useState([])
    return(
        <form method="post">
            <div className="centerContainer">
                <Accordion title="Basic Information" active={true}>
                <div className="form-group">
                    <div className="row">
                        <div className="col-xs-6"><input type="text" className="form-control" name="first_name" placeholder="First Name" /></div>
                        <div className="col-xs-6"><input type="text" className="form-control" name="middle_name" placeholder="Middle Name" /></div>  
                    </div>        	
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-xs-6"><input type="text" className="form-control" name="last_name" placeholder="Last Name"  required="required"/></div>
                        <div className="col-xs-6"><input type="text" className="form-control" name="last_name" placeholder="Suffix" /></div>  
                    </div>        	
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" name="phone" placeholder="Contact number" placeholder="xxxx-xxx-xxxx" pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}" required />      
                </div>
                <div className="form-group">
        	        <input type="email" className="form-control" name="email" placeholder="Email"  required="required" />
                </div>

                <div className="form-group">
                    <input type="date" className="form-control" name="username" placeholder="Birthday" />
                </div>

                <div className="form-group">
                        <label className="col-form-label col-4">Mode of Consultation</label>
                        <select className="form-control">
                            <option value="days">Virtual</option>
                            <option value="hrs">Face to Face</option>
                            <option value="mins">Both</option>
                        </select>
                </div>

                <div className="form-group">
                    <label className="col-form-label col-4">Select an image</label>    
                    <div className="row">
                        <div className="col-xs-12"><input type="file" className="form-control" name="first_name" placeholder="Zipcode" /></div>
                    </div>        	
                </div>
            

                </Accordion>
                <Accordion title="Educational Attainment">
                    <div className="form-group">
                         <div className="col-xs-6">
                            <label className="col-form-label col-4">Degree</label>
                            <select className="form-control">
                                <option value="days">Undergraduate</option>
                                <option value="hrs">Bachelor</option>
                                <option value="mins">Masteral</option>
                                <option value="mins">Doctorate</option>
                            </select>
                        </div>
                        
                        <div className="col-xs-6">
                            <label className="col-form-label col-4">Course  </label>
                            <input type="text" className="form-control " name="email" placeholder="Email"  required="required" />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-xs-6">
                            <label className="col-form-label col-4">School </label>
                            <input type="text" className="form-control  col-xs-12" name="email" placeholder="Email"  required="required" />
                        </div>
                        <div className="col-xs-6">
                            <label className="col-form-label col-4">Date Finish</label>
                            <input type="date" className="form-control" name="username" placeholder="Birthday" />
                        </div>
                    </div>
                </Accordion>

                <Accordion title="Specialization">
                    <div className="form-group">
                        <div className="col-xs-6">
                            <label className="col-form-label col-4">Specialty</label>
                            <input type="text" className="form-control " name="email" placeholder="Email"  required="required" />
                         </div>
                        
                        <div className="col-xs-6">
                            <label className="col-form-label col-4">Sub-specialization </label>
                            <input type="text" className="form-control " name="email" placeholder="Email"  required="required" />
                        </div>
                    </div>
                </Accordion>
            </div>
        </form>
    );
}