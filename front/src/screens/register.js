import React , {useState} from "react";
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/checkout";
import { register } from "../actions/userActions";


export default function Register(props){
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("Last name");
    const [middlename, setMiddlename]= useState("");
    const [suffix,setSuffix]=useState("");
    const [addressLine1, setAddress1] = useState("");
    const [addressLine2, setAddress2] = useState("");
    const [Municipality, setMunicipality] = useState("");
    const [provice, setProvince] = useState(""); 
    const [contact, setContact] = useState("Contact Number");
    const [email, setEmail] = useState("Email");
    const [Birthday,setBirthday] = useState("")
    const [gender, setGender]= useState("Gender");
    const [status, setStatus] = useState("Status");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const navigate = useNavigate()

    var date = new Date(); 
    var time = date.getMinutes() +""+ date.getMilliseconds();
    var username=firstname && lastname  ? firstname.substring(0,1).toUpperCase()+"."+lastname.toUpperCase()+time: "";

    const userreg = useSelector((x)=>x.userReg)
    const {loading , error, userReg} = userreg;
    console.log("Loading: ", loading, "Error: ", error, "userReg: ", userReg)

    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(register(username, firstname, lastname, middlename, suffix,Birthday, gender, addressLine1, addressLine2, Municipality, provice, status, contact, email, password))
        if(error === undefined || error === ""){
            navigate("/success");
        }
        
    }

    return (
    <div classNameName="bodyform">
        <div className="signup-form">
            <form  method="post" onSubmit={submitHandler}>
		        <h2>Sign up</h2>
		        <p>Please fill in this form to create an account</p>
		        <hr/>
                 
                <div className="form-group">
                    <div className="row">
                        <div className="col-xs-6"><input type="text" className="form-control" name="first_name" placeholder="First Name" value={firstname} required onChange={(e)=>{setFirstname(e.target.value)}}/></div>
                        <div className="col-xs-6"><input type="text" className="form-control" name="middle_name" placeholder="Middle Name" value={middlename} onChange={(e)=>{setMiddlename(e.target.value)}}/></div>  
                    </div>        	
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-xs-6"><input type="text" className="form-control" name="last_name" placeholder="Last Name"  required="required" onChange={(e)=>{setLastname(e.target.value)}}/></div>
                        <div className="col-xs-6"><input type="text" className="form-control" name="last_name" placeholder="Suffix" value={suffix} onChange={(e)=>{setSuffix(e.target.value)}}/></div>  
                    </div>        	
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" name="address" placeholder="House number, Street" value= {addressLine1}required="required" onChange={(e)=>{setAddress1(e.target.value)}}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" name="address" placeholder="Subdivision, Barangay" value={addressLine2} required="required" onChange={(e)=>{setAddress2(e.target.value)}}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" name="address" placeholder="Municipality" value={Municipality} required="required" onChange={(e)=>{setMunicipality(e.target.value)}}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" name="address" placeholder="Province" value={provice} required="required" onChange={(e)=>{setProvince(e.target.value)}}/>
                </div>

                <div className="form-group">
                    <input type="text" className="form-control" name="phone"  placeholder="xxxx-xxx-xxxx" pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}" required onChange={(e)=>{setContact(e.target.value)}}/>      
                </div>
                <div className="form-group">
        	        <input type="email" className="form-control" name="email" placeholder="Email"  required="required" onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>

                <div className="form-group">
                    <label className="col-form-label col-4">BIRTHDATE</label>
                    <input type="date" className="form-control" name="username" placeholder="Birthday" value={Birthday} required="required" onChange={(e)=>{setBirthday(e.target.value)}}/>
                </div>
            
                <div className="form-group">
                    <div className="col-xs-6">
                        <label className="col-form-label col-4">GENDER</label>
                        <div class="radio ">
                            <label>
                                <input type="radio" name="optionsRadios"  value="Male" onChange={(e)=>{setGender(e.target.value)}}/>
                                Male
                            </label>
                        </div> 
                        <div class="radio ">
                            <label>
                                <input type="radio" name="optionsRadios"  value="Female" onChange={(e)=>{setGender(e.target.value)}}/>
                                Female
                            </label>
                        </div>
                    </div>

                    <div className="col-xs-6">
                        <label className="col-form-label col-4">Civil Status</label>
                        <div class="radio">
                            <label>
                                <input type="radio" name="optionsRadios"  value="Single" onChange={(e)=>{setStatus(e.target.value)}}/>
                                Single
                            </label>
                        </div>
                        <div class="radio">
                            <label>
                                <input type="radio" name="optionsRadios"  value="Married" onChange={(e)=>{setStatus(e.target.value)}}/>
                                Married
                            </label>
                        </div>
                        <div class="radio">
                            <label>
                                <input type="radio" name="optionsRadios"  value="Widow" onChange={(e)=>{setStatus(e.target.value)}}/>
                                Widow
                            </label>
                        </div>
                    </div>
                </div>
                        

                {/* <div className="form-check form-check-inline">
                        <label className="form-check-input" for="civilwidowed">Username: <h3><b>{username}</b></h3> </label>
                </div> */}

                <div className="form-group">
                    <input type="password" className="form-control" name="password" placeholder="Enter password" value ={password} required="required" onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" name="confirm_password" placeholder="Confirm password" value ={confirmpassword} required="required" onChange={(e)=>{setConfirmpassword(e.target.value)}}/>
                    <span>{password!==confirmpassword ? "Password does not match": ""}</span>
                </div> 
            
                <div className="form-group">
                    <label className="checkbox-inline">
                        <input type="checkbox" required="required"/> I accept the 
                        <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-lg" onClick={submitHandler}>Next</button>
                </div>
                <div className="hint-text">Already have an account? <a href="/signin">Login here</a></div>
            </form>
	        
        </div>
    </div>
    );
}