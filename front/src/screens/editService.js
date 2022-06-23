const reg = () =>{
    return(
        <>
        <Accordion title="Address">
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
                                <div className="col-xs-12"><input type="text" className="form-control" name="first_name" placeholder="&#xf3c5; Province" /></div>
                            </div>        	
                        </div>

                        <div className="form-group">
                            <div className="row">
                                <div className="col-xs-12"><input type="text" className="form-control" name="first_name" placeholder="&#xf2b9; Zipcode" /></div>
                            </div>        	
                        </div>
                </Accordion>
                <Accordion title="Service available time">
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
        </>
    )
}