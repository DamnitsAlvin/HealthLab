import React , {useEffect, useState} from "react"; 
import {useDispatch, useSelector} from "react-redux";
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { usersignin } from "../actions/userActions";



export default function SignIn(props){
  const [ID,setID] = useState("");
  const [password, setPassword] = useState("");
  const [userLabel, setUserLabel] = useState("")
  const [placeHolder, setPlaceHolder] = useState("")
  
  const navigate = useNavigate(); 
  const [searchParams] = useSearchParams()
  const user = searchParams.get('userType') 


  const userType = user; 
  useEffect( ()=>{
    setUserLabel(userType.charAt(0).toUpperCase() + userType.slice(1) + " ID")
    setPlaceHolder(`Enter ${userLabel} or email`)
  }, [userType, userLabel])

    //props.location.search ? props.location.search.split('=')[1] :
    const redirect =  searchParams.get('redirect') ? searchParams.get('redirect') : "/";

    const userSignin = useSelector((state)=>state.userSignIn);
    const { userInfo, loading, error } = userSignin;


    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        console.log("Clicked submit")
        dispatch(usersignin(ID,password, userType))
        
    }
    useEffect(()=>{
      if(userInfo && userInfo.data[2] == "user"){
        navigate(redirect);
     }else if(userInfo && userInfo.data[2] == "doctor"){
        navigate("/appointments")
     }
   }, [props.history, redirect, userInfo])


    return(
      <div className="wow fadeInDown" data-wow-delay="0.1s">
        <div className= "signinform" >
          <div className='halfImage'>
             <img src="/img/backgrounds/signin_BG.jpg" alt ="signinbackground"/>
          </div>
       
          <form className="form" onSubmit={submitHandler}>
            <div>
              <h1>ACCOUNT LOGIN</h1>
              <p class="parag">Login here using Email and Password</p>
              {error && <div className="alert alert-danger">Invalid Credentials</div>}
              
            </div>
            <div>
              <label htmlFor="ID">{userLabel}</label>
              <input class="boxShadow"
                type="text"
                id="ID"
                placeholder={placeHolder}
                required
                onChange={(e) => setID(e.target.value)}
              ></input>
            </div>
            
            <div>
              <label htmlFor="password">Password</label>
              <input class="boxShadow"
                type="password"
                id="password"
                placeholder="Enter password"
                required
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label />
              <button className="btn signin-submit" type="submit" disabled={loading}>
                Sign In
              </button>
            </div>
            <div>
              <label />
              <div class="new">
                New user? <Link to={userType=="user" ? "/register": userType=="doctor" ? "/registerdoctor":"/registerService"}> Create your account</Link>
              </div>
            </div>
          </form>
        </div>
        </div>
    )
}