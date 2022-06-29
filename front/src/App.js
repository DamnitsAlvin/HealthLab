import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import { signout} from "./actions/userActions";
import {Route, Routes, Link, useNavigate, Navigate} from 'react-router-dom'
import Intro from "./components/intro";
import CreateAppointmentSlip from "./screens/createAppointmentSlip";
import SignIn from "./screens/signin";
import UserTypeSignIn from "./screens/usertypesignin";
import Register from "./screens/register"
import AppointmentPage from "./screens/appointment";
import Results from "./screens/results";
import Overview from "./screens/dentistquestions";
import Testing from "./test/Testing";
import RegisterService from './screens/registerService';
import RegisterDoctor from './screens/registerDoctor';
import AccountRegister from './screens/accountRegistered';
import Doctorprofile from './screens/doctorprofile'; 
import Bookdoctor from './screens/bookdoctor'; 

import './App.css';
import Chatbot from './components/chatbot';
import UserProfile from './screens/userProfile';
import Kalendaryo from './components/calendar';
import ServiceProfile from './screens/serviceprofile';
import Invoice from './screens/invoice';
import ServicePage from './screens/servicepage';
import DoctorScreen from './screens/newdoctorscreen';
import AdminLogin from './screens/adminLogin';
import VerifyUser from './screens/verifyUser';
import CreateDiagnosis from './screens/createDiagnosis';
import BookServiceProfile from './screens/bookservice';
import CreateServiceAppointmentSlip from "./screens/createserviceappointment";
import GMaps from './screens/Gmaps'
import DoctorRoute from './components/DoctorRoute';
import SorryPage from './screens/sorryPage';

function App() {
  
  const userSignin = useSelector((state)=>state.userSignIn);
  const {userInfo} = userSignin;

  const navigate= useNavigate()
  const dispatch = useDispatch()

  const signoutHandler = () =>{
      	dispatch(signout());
		navigate("/", {replace: true});
   }; 


  return (
  <>
  {
	  window.location.href != "http://localhost:3000/admin" ? (
		  <>
		<div id="page-top" data-spy="scroll" data-target=".navbar-custom">
				<div id="wrapper">
					<nav className="navbar navbar-custom navbar-fixed-top" role="navigation">
						<div className="top-area">
							<div className="container">
							<div className="row">
								<div className="col-sm-6 col-md-6">
								<p className="bold text-left">Monday - Saturday, 8am to 10pm </p>
								</div>
								<div className="col-sm-6 col-md-6">
								<p className="bold text-right">Call us now +62 008 65 001</p>
								</div>
							</div>
							</div>
						</div>

						<div className="container navigation">
							<div className="navbar-header page-scroll">
								<button type="button" className="navbar-toggle" data-toggle="collapse"
								data-target=".navbar-main-collapse">
								<i className="fa fa-bars"></i>
								</button>
								<Link className="navbar-brand" to="/"><span className="medi">MEDI</span><span className="call">CALL</span></Link>
							</div>

							<div className="collapse navbar-collapse navbar-right navbar-main-collapse">
								<ul className="nav navbar-nav">
								{!userInfo || userInfo.data[2] != "admin" ? (
								<>
									<li className="top"><Link to="/">Home</Link></li>
									{!userInfo || userInfo.data[2] == "user" ? 
									(<li className="top"><Link to="/doctor/Neurology">Doctors</Link></li>) : (null)
									}
									{(userInfo && userInfo.data[2])&&
															<>
																<li className="dropdown top"><Link to="/appointments" className='dropdown-toggle' data-toggle="dropdown">Appointment<b className="caret"></b></Link>
																<ul className='dropdown-menu'>
																<li className="top"><Link to="/">Manage</Link></li>
																<li className="top"><Link to='/'>Current</Link></li>
																<li className="top"><Link to="/">Declined</Link></li>
																<li className="top"><Link to="/">Done</Link></li>
																</ul>
																
																</li>
																<li className="top"><Link to="/calendar">Schedule</Link></li>
																<li className="top"><Link to={userInfo.data[2] == "doctor" ? `/doctor/${userInfo.data[0]}/edit` : userInfo.data[2] == "service" ? "/serviceprofile" : "/userprofile"}>Profile</Link></li>
																<li className="top"><Link onClick={signoutHandler} to="/">Sign out</Link></li>
															</>
														}
									
									{userInfo ? (
									<li className="dropdown top">
										<Link to="/" className="dropdown-toggle" data-toggle="dropdown"><span className="badge custom-badge red pull-right"></span>Welcome {userInfo.data[0]} <b className="caret"></b></Link>
										<ul className="dropdown-menu">
											<li><Link to={userInfo.data[2]=="doctor" ? `/doctor/${userInfo.data[0]}/edit` :userInfo.data[2]=="service" ? "/serviceprofile":  "/userprofile" }>Profile</Link></li>
											<li><Link to="/appointments">Appointments</Link></li>
											<li><Link to="/calendar">Calendar</Link></li>
											{userInfo.data[2] != "doctor" ? (
											<li><Link to="/map">Map</Link></li>
											) : (null)}
											
											<li> <Link onClick={signoutHandler} className="dropdown-item" to="/" >Sign Out</Link></li>
										</ul>
									</li>
									):(
									<li className="top"><Link to="/signintype">Sign In</Link></li>
									)	
									}
								</>
								) : (
								<>
									<li> <Link className="dropdown-item" to="/admin/verifyusers" >Back To table</Link></li>
									<li> <Link onClick={signoutHandler} className="dropdown-item" to="/" >Sign Out</Link></li>
								</>
								)}
								
								
								</ul>
							</div>
						</div>
						</nav>
						
				</div>	
			</div>
		  </>

	  ) : <></>

  }
   
		<main>
		
			<Routes>
				<Route exact path = "/" element={<Intro/>}/>
				<Route path='/signin/' element={<SignIn/>}/>
				<Route path="/test/:id" element={<Testing/>}/>
				<Route path='/signintype' element={<UserTypeSignIn/>}/>

				<Route path="/register" element={<Register/>}/>
				<Route path="/registerservice" element={<RegisterService/>}/>
				<Route path="/registerdoctor" element={<RegisterDoctor/>} />
				<Route path="/success" element={ <AccountRegister> </AccountRegister> }/>
				<Route path='/sorrypage' element={<SorryPage></SorryPage>}/>

				{/**Display to user */}
				<Route path="/service/:category" element={<ServicePage></ServicePage>}/>	
				<Route path ="/doctor/:category" element={<DoctorScreen></DoctorScreen>}/>

				<Route path ="/appointments" element={<AppointmentPage/>}/>
				
				<Route path="/createAppointment" element={<CreateAppointmentSlip/>}/>
				<Route path="/createServiceAppointment" element={<CreateServiceAppointmentSlip></CreateServiceAppointmentSlip>}/>
				
				
				<Route path="/doctor/:id/edit" element={!userInfo || userInfo.data[2] !="doctor" ? <Navigate to="/signintype"/> : <Doctorprofile/>}></Route>
				
				<Route path="/calendar" element={<Kalendaryo></Kalendaryo>}/>
				<Route path="/bookdoctor/:id" element={<Bookdoctor/>}/>
				<Route path="/bookservice/:id" element={<BookServiceProfile></BookServiceProfile>}/>

				<Route path="/userprofile" element={<UserProfile></UserProfile>}/>
				<Route path="/serviceprofile" element={<ServiceProfile></ServiceProfile>} />
				<Route path="/invoice" element={<Invoice></Invoice>} />
				<Route path="/createDiagnosis" element={<CreateDiagnosis></CreateDiagnosis>}/>
				<Route path="/admin" element={<AdminLogin></AdminLogin>}> </Route>
  				<Route path="/admin/verifyusers" element={<VerifyUser></VerifyUser>}/>
				<Route path="/map" element={<GMaps></GMaps>} />
				
			
				
			</Routes>
			<Chatbot></Chatbot>
			
		</main>

		{
	   window.location.href != "http://localhost:3000/admin"  ? (
		<footer>

			<div className="container">
				<div className="row">
					<div className="col-sm-6 col-md-4">
						<div className="wow fadeInDown" data-wow-delay="0.1s">
							<div className="widget">
								<h5>About Medicall</h5>
								<p>
									
								</p>
							</div>
						</div>
						<div className="wow fadeInDown" data-wow-delay="0.1s">
							<div className="widget">
								<h5>Information</h5>
								<ul>
									<li><Link to="#">Home</Link></li>
									<li><Link to="#">Laboratory</Link></li>
									<li><Link to="#">Medical treatment</Link></li>
									<li><Link to="#">Terms & conditions</Link></li>
								</ul>
							</div>
						</div>
					</div>
					<div className="col-sm-6 col-md-4">
						<div className="wow fadeInDown" data-wow-delay="0.1s">
							<div className="widget">
								<h5>Medicall Center</h5>
								<p>
									Providing the Best Quality Healthcare for you.
								</p>
								<ul>
									<li>
										<span className="fa-stack fa-lg">
											<i className="fa fa-circle fa-stack-2x"></i>
											<i className="fa fa-calendar-o fa-stack-1x fa-inverse"></i>
										</span> Monday - Saturday, 8am to 10pm
									</li>
									<li>
										<span className="fa-stack fa-lg">
											<i className="fa fa-circle fa-stack-2x"></i>
											<i className="fa fa-phone fa-stack-1x fa-inverse"></i>
										</span> +63 999999999
									</li>
									<li>
										<span className="fa-stack fa-lg">
											<i className="fa fa-circle fa-stack-2x"></i>
											<i className="fa fa-envelope-o fa-stack-1x fa-inverse"></i>
										</span> hello@medicall.com
									</li>

								</ul>
							</div>
						</div>
					</div>
					<div className="col-sm-6 col-md-4">
						<div className="wow fadeInDown" data-wow-delay="0.1s">
							<div className="widget">
								<h5>Our location</h5>
								<p>Las Pinas Metro Manila</p>

							</div>
						</div>
						<div className="wow fadeInDown" data-wow-delay="0.1s">
							<div className="widget">
								<h5>Follow us</h5>
								<ul className="company-social">
									<li className="social-facebook"><Link to="#"><i className="fa fa-facebook"></i></Link></li>
									<li className="social-twitter"><Link to="#"><i className="fa fa-twitter"></i></Link></li>
									<li className="social-google"><Link to="#"><i className="fa fa-google-plus"></i></Link></li>
									<li className="social-vimeo"><Link to="#"><i className="fa fa-vimeo-square"></i></Link></li>
									<li className="social-dribble"><Link to="#"><i className="fa fa-dribbble"></i></Link></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="sub-footer">
				<div className="container">
					<div className="row">
						<div className="col-sm-6 col-md-6 col-lg-6">
							<div className="wow fadeInLeft" data-wow-delay="0.1s">
								<div className="text-center">
									<p>&copy;Copyright 2021 - Medicall. All rights reserved.</p>
								</div>
							</div>
						</div>
						<div className="col-sm-6 col-md-6 col-lg-6">
							<div className="wow fadeInRight" data-wow-delay="0.1s">
								<div className="text-center">
									<p><Link to="#">Panagsagan Lozano Palumpon Lim</Link> by Medicall</p>
									<p>Credits: 
										https://www.svgrepo.com/ - icons 
										
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	   ): <></>
}

		<Link to="#" className="scrollup"><i className="fa fa-angle-up active"></i></Link>  
	</>
  );
}

export default App;
