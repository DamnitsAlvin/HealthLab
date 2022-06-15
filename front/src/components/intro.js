import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userBasicAppointment} from "../actions/userActions";
import  {useNavigate} from "react-router-dom";
import Box from "./box";
import Service from "./services";
import Doctor from "./doctor"; 
import Facilities from "./facilities";
import Category from "./categories";

export default function Intro(){
	const getUserInfo =  useSelector(x=>x.userSignIn);
	const { userInfo } = getUserInfo;

	const [PatientFirstName, setPatientFirstName] = useState(userInfo ? userInfo.data[1] : " ");
	const [PatientLastName, setPatientLastName] = useState(userInfo ? userInfo.data[2] : " ");
	const [PatientEmail, setPatientEmail] = useState(userInfo ? userInfo.data[13] : " "); 
	const [PhoneNumber, setPhoneNumber] = useState(userInfo ? userInfo.data[12] : " ");
	
	const navigate = useNavigate(); 

	const dispatch = useDispatch();
	const submitHandler = (e)=>{
		e.preventDefault()
		dispatch(userBasicAppointment({PatientFirstName, PatientLastName, PatientEmail, PhoneNumber}));
		navigate("/signin?redirect=createAppointment");
	}

    return(
		<div>
        <section id="intro" className="intro">
		<div className="intro-content">
			<div className="container">
				<div className="row">
					<div className="col-lg-6">
						<div className="wow fadeInDown" data-wow-offset="0" data-wow-delay="0.1s">
							<h2 className="h-ultra">Medicall Appointment Center</h2>
						</div>
						<div className="wow fadeInUp" data-wow-offset="0" data-wow-delay="0.1s">
							<h4 className="h-light">Provide <span className="color">best quality healthcare</span> for you</h4>
						</div>
						<div className="well well-trans">
							<div className="wow fadeInRight" data-wow-delay="0.1s">

								<ul className="lead-list">
									<li><span className="fa fa-check fa-2x icon-success"></span> <span
											className="list"><strong>Handled by healthcare professionals</strong><br />
											Used by  healthcare personnel with specialization</span></li>
									<li><span className="fa fa-check fa-2x icon-success"></span> <span
											className="list"><strong>Book appointments immediately</strong><br />
											Advance booking features for your everyday concern</span></li>
									<li><span className="fa fa-check fa-2x icon-success"></span> <span
											className="list"><strong>Safety is the best policy</strong><br />
											We prioritize safety measures including face to face interaction</span></li>
								</ul>

							</div>
						</div>
					</div>
					<div className="col-lg-6">
						<div className="form-wrapper">
							<div className="wow fadeInRight" data-wow-duration="2s" data-wow-delay="0.2s">

								<div className="panel panel-skin">
									<div className="panel-heading">
										<h3 className="panel-title"><span className="fa fa-pencil-square-o"></span> Book an
											appoinment</h3>
									</div>
									<div className="panel-body">
										<form role="form" className="lead" onSubmit={submitHandler}>
											<div className="row">
												<div className="col-xs-6 col-sm-6 col-md-6">
													<div className="form-group">
														<label> Patient First Name</label>
														<input type="text" name="first_name" id="first_name"
															className="form-control input-md" placeholder="First Name" onChange={e=>setPatientFirstName(e.target.value)} required/>
													</div>
												</div>
												<div className="col-xs-6 col-sm-6 col-md-6">
													<div className="form-group">
														<label> Patient Last Name</label>
														<input type="text" name="last_name" id="last_name"
															className="form-control input-md" placeholder="Last Name" onChange={e=>setPatientLastName(e.target.value)} required/>
													</div>
											  </div>
                                            </div>
											<div className="row">
												<div className="col-xs-6 col-sm-6 col-md-6">
													<div className="form-group">
														<label>Email</label>
														<input type="email" name="email" id="email"
															className="form-control input-md" placeholder="user@email.com" onChange={e=>setPatientEmail(e.target.value)}required/>
													</div>
												</div>
												<div className="col-xs-6 col-sm-6 col-md-6">
													<div className="form-group">
														<label>Phone number</label>
														<input type="text" name="phone" id="phone"
															className="form-control input-md" pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}" placeholder="xxxx-xxx-xxxx" onChange={e=>setPhoneNumber(e.target.value)}required/>
													</div>
												</div>
											</div>

											<input type="submit" value="Submit" className="btn btn-skin btn-block btn-lg" disabled />

											<p className="lead-footer">* We'll contact you by phone & email later</p>

										</form>
									</div>
								</div>
					    </div>
            </div>
          </div>
				</div>
			</div>
		</div>
	</section>

		<Box/>
		<Service/>	
		<Category/>
		<Facilities />
	</div>
    );
}