import Accordion from "../components/accordion"
import React from 'react'
export default function RegisterService(){
    
    return(
        <>
         <div className="wow fadeInDown" data-wow-delay="0.1s">
        <form  method="post">
            <div className="centerContainer">
                <h2>Register here</h2>
		        <p>Please fill in this form to create an account</p>
                
		        <hr/>
                <Accordion title="Basic Service Information" active={true}>
                        <div class="fa-thin fa-building" className="form-group">
                            <div  className="row" >
                            <div  className="col-xs-12" ><input   type="text" className="form-control" name="first_name"  placeholder="&#xf015; Establishment Name" /></div>
                            </div>        	
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-xs-12"><input type="text" className="form-control" name="first_name" placeholder="&#xf276; Residential no/Building no/ Floor Street Subdivision"/></div>
                            </div>        	
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-xs-12"><input type="text" className="form-control" name="first_name" placeholder="&#xf64f; Barangay" /></div>
                            </div>        	
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-xs-12"><input type="text" className="form-control" name="first_name" placeholder="&#xf3c5; Municipality" /></div>
                            </div>        	
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-xs-12"><input type="text" className="form-control" name="first_name" placeholder="&#xf2b9; Zipcode" /></div>
                            </div>        	
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-xs-12"><input type="file" className="form-control" name="first_name" placeholder="&#xf015; Zipcode" /></div>
                            </div>        	
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-xs-5"><input type="text" className="form-control" name="first_name" placeholder="&#xf017; Open Day" /></div>
                                <div className="col-xs-1">TO</div>
                                <div className="col-xs-6"><input type="text" className="form-control" name="first_name" placeholder="&#xf273; Close Day" /></div>
                            </div>        	
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-xs-1">FROM</div>
                            </div>        	
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-xs-5"><input type="text" className="form-control" name="first_name" placeholder="&#xf017; Open Day" /></div>
                                <div className="col-xs-1">TO</div>
                                <div className="col-xs-6"><input type="text" className="form-control" name="first_name" placeholder="&#xf273; Close Day" /></div>
                            </div>        	
                        </div>
                        
                    
                </Accordion>
                <Accordion title="Services offered">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-xs-6"><input type="text" className="form-control" name="first_name" placeholder="Service name" /></div>
                            <div class="input-group col-xs-6">
                                <span class="input-group-addon" id="basic-addon1">&#8369;</span>
                                <input type="text" class="form-control" placeholder="Cost" aria-describedby="basic-addon1"/>
                            </div>
                        </div>        	
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-xs-10"><input type="text" className="form-control" name="first_name" placeholder="Average Waiting Time" /></div>
                            <div className="col-xs-2">
                                <select className="form-control">
                                    <option value="days">days</option>
                                    <option value="hrs">hours</option>
                                    <option value="mins">minutes</option>
                                </select>
                            </div>
                        </div>        	
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-xs-12">
                                <textarea id="description" className="form-control" placeholder="Description"></textarea>
                            </div>
                        </div>        	
                    </div>
                    
                    
                </Accordion>
                <Accordion title="Services payment">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-xs-12">
                                <select className="form-control">
                                    <option value="days">GCASH</option>
                                    <option value="hrs">PAYPAL</option>
                                    <option value="mins">BDO</option>
                                </select>
                            </div>
                        </div>        	
                    </div>  
                    <div className="form-group">
                        <div className="row">
                            <div className="col-xs-12"><input type="text" className="form-control" name="first_name" placeholder="&#xf2c2; Reference Number" /></div>
                        </div>        	
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-xs-12"><input type="text" className="form-control" name="first_name" placeholder="&#xf47f; Reference Name" /></div>
                        </div>        	
                    </div>
                </Accordion>
                <div className="form-group">
                    <div className="hint-text">Already have an account? <a href="/signin">Login here</a></div>
                    <div className="leftSubmit">
                        <button type="submit" className="btn btn-info btn-lg" >Submit</button>
                    </div>
                </div>
            </div>
        </form>
        </div>
        </>
    )
    
}