import React , {useEffect, useState} from "react"; 
import {useDispatch, useSelector} from "react-redux";
import { Link, useParams, useNavigate } from 'react-router-dom'
import { usersignin } from "../actions/userActions";



export default function SignIn(props){
  const [ID,setID] = useState("");
  const [password, setPassword] = useState("");
  const [userLabel, setUserLabel] = useState("")
  const [placeHolder, setPlaceHolder] = useState("")
  const {user} = useParams(); 
  const navigate = useNavigate(); 

  const userType = user; 
  useEffect( ()=>{
    setUserLabel(userType.charAt(0).toUpperCase() + userType.slice(1) + " ID")
    setPlaceHolder(`Enter ${userLabel} or email`)
  }, [userType, userLabel])

    //props.location.search ? props.location.search.split('=')[1] :
    const redirect =  "/";

    const userSignin = useSelector((state)=>state.userSignIn);
    const { userInfo, loading, error } = userSignin;


    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(usersignin(ID,password, userType))
    }
    useEffect(()=>{
      if(userInfo){
        navigate(redirect);
     }
   }, [props.history, redirect, userInfo])


    return(
        <div className= "signinform">
          <div className='halfImage'>
             <img src="/img/backgrounds/signin_BG.jpg" alt ="signinbackground"/>
          </div>
       
          <form className="form" onSubmit={submitHandler}>
            <div>
              <h1>ACCOUNT LOGIN</h1>
              <p class="parag">Login here using Email and Password</p>
              {error && <div className="invalid">Invalid password</div>}
              
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
              <button className="btn signin-submit" type="submit">
                Sign In
              </button>
            </div>
            <div>
              <label />
              <div class="new">
                New user? <Link to={userType=="user" ? "/register": "/registerService"}> Create your account</Link>
              </div>
            </div>
          </form>
        </div>
    )
}